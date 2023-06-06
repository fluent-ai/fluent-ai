import {
  createClient,
  SupabaseClient,
  Session,
  AuthError,
  AuthChangeEvent,
} from '@supabase/supabase-js';
import { deflate, inflate } from 'pako';
import { Node, Edge } from 'reactflow';

interface FlowReference {
  source?: string;
  id: string;
  displayName: string;
}
interface FlowDeflated extends FlowReference {
  flow: Uint8Array;
}

interface FlowInflated extends FlowReference {
  nodes: Node[];
  edges: Edge[];
  inputs: {
    id: string;
    nodeInputs: Record<string, unknown>;
  }[];
}

class Supabase {
  private client: SupabaseClient;
  private flowsDeflated: FlowDeflated[];

  constructor() {
    this.client = createClient(
      'https://rrgtmovkczotmiacaibj.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ3Rtb3ZrY3pvdG1pYWNhaWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NjgxMzYsImV4cCI6MjAwMTU0NDEzNn0.wiV3JVN1q2-PWxBZLi1cKQ6gYRE9gyE_aQcLQXzR6mw'
    );
    this.flowsDeflated = [];
  }
  public loadClient(): void {
    this.client = createClient(
      'https://rrgtmovkczotmiacaibj.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ3Rtb3ZrY3pvdG1pYWNhaWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NjgxMzYsImV4cCI6MjAwMTU0NDEzNn0.wiV3JVN1q2-PWxBZLi1cKQ6gYRE9gyE_aQcLQXzR6mw'
    );
  }

  public getClient(): SupabaseClient {
    return this.client;
  }

  public getSession(): Promise<
    | {
        data: {
          session: Session;
        };
        error: null;
      }
    | {
        data: {
          session: null;
        };
        error: AuthError;
      }
    | {
        data: {
          session: null;
        };
        error: null;
      }
  > {
    return this.client.auth.getSession();
  }

  public onAuthStateChange(
    callback: (_event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.client.auth.onAuthStateChange(callback);
  }

  public signOut(): void {
    this.client.auth.signOut();
  }

  private inflateFlow(db: FlowDeflated[], id: string): FlowInflated {
    const flowDeflated = db.find((flow) => flow.id === id);
    if (!flowDeflated) {
      throw new Error('Flow not found');
    }

    const flowInflatedJSON = inflate(flowDeflated.flow, { to: 'string' });
    const flowInflated = JSON.parse(flowInflatedJSON) as FlowInflated;

    return {
      id: flowDeflated.id,
      displayName: flowDeflated.displayName,
      nodes: flowInflated.nodes,
      edges: flowInflated.edges,
      inputs: flowInflated.inputs,
    };
  }

  public async updateFlows(): Promise<void> {
    const promises = ['flows', 'examples'].map(async (source) => {
      const { data, error } = await this.client.from(source).select('*');
      if (error) {
        console.error(`Error fetching ${source}:`, error);
        return [];
      } else {
        const flows = data?.map((flow) => flow as FlowDeflated);
        flows.forEach((flow) => {
          flow.source = source;
          //@ts-expect-error supabase prefers _ over camelCase
          flow.displayName = flow.display_name;
          //@ts-expect-error supabase prefers _ over camelCase
          delete flow.display_name;
        });
        return flows;
      }
    });
    const results = await Promise.all(promises);
    const flattenedResults = ([] as FlowDeflated[]).concat(...results);
    this.flowsDeflated = flattenedResults;
    console.log('Flows updated!', this.flowsDeflated);
  }

  public getFlow(id: string): FlowInflated | null {
    return this.inflateFlow(this.flowsDeflated, id);
  }

  public getFlows(source = 'flows'): FlowReference[] {
    return this.flowsDeflated
      .filter((flow) => flow.source === source)
      .map((flow) => ({
        id: flow.id,
        displayName: flow.displayName,
      }));
  }

  public async saveFlow({
    id,
    userId,
    displayName,
    flow,
  }: {
    id: string;
    userId: string;
    displayName: string;
    flow: FlowInflated;
  }): Promise<void> {
    const deflatedFlow = {
      id,
      userId,
      flow: deflate(JSON.stringify(flow)),
      displayName,
    };
    const { error } = await this.client.from('flows').upsert(
      {
        id,
        user_id: deflatedFlow.userId,
        flow: deflatedFlow.flow,
        display_name: deflatedFlow.displayName,
      },
      { onConflict: 'id' }
    );
    if (error) {
      console.error('Error saving flow:', error);
    } else {
      console.log('Flow saved successfully!');
      this.flowsDeflated = [
        ...this.flowsDeflated.filter((flow) => flow.id !== id),
        deflatedFlow,
      ];
      this.updateFlows();
    }
  }

  public async deleteFlow(id: string): Promise<void> {
    const { error } = await this.client.from('flows').delete().eq('id', id);
    if (error) {
      console.error('Error deleting flow:', error);
    } else {
      console.log('Flow deleted successfully!');
      this.flowsDeflated = this.flowsDeflated.filter((flow) => flow.id !== id);
      this.updateFlows();
    }
  }
}

export const supabase = new Supabase();
