//TODO: this really needs to be a hook...
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
  globals: Record<string, unknown>;
}

export interface Settings {
  openAiUseOwnKey: boolean;
  openAiKey: string;
  remoteRunnerEnabled: boolean;
  remoteRunnerIp: string;
  remoteRunnerPort: number;
}

class Supabase {
  private client: SupabaseClient;
  private flowsDeflated: FlowDeflated[];

  constructor() {
    this.client = createClient(
      'https://rrgtmovkczotmiacaibj.supabase.co',
      //this is a public key, exposure is intended. Auth is layered on top with JWTs
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ3Rtb3ZrY3pvdG1pYWNhaWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NjgxMzYsImV4cCI6MjAwMTU0NDEzNn0.wiV3JVN1q2-PWxBZLi1cKQ6gYRE9gyE_aQcLQXzR6mw'
    );
    this.flowsDeflated = [];
  }
  public loadClient(): void {
    this.client = createClient(
      'https://rrgtmovkczotmiacaibj.supabase.co',
      //this is a public key, exposure is intended. Auth is layered on top with JWTs
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
    const flow = db.find((flow) => flow.id === id);
    if (!flow) {
      throw new Error('Flow not found');
    }

    const flowInflatedJSON = inflate(flow.flow, { to: 'string' });
    const flowInflated = JSON.parse(flowInflatedJSON) as FlowInflated;

    return {
      id: flow.id,
      displayName: flow.displayName,
      nodes: flowInflated.nodes,
      edges: flowInflated.edges,
      inputs: flowInflated.inputs,
      globals: flowInflated.globals,
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

  public async isFlowChanged({
    id,
    userId,
    displayName,
    flow,
  }: {
    id: string;
    userId: string;
    displayName: string;
    flow: FlowInflated;
  }): Promise<boolean> {
    const deflatedFlow = {
      id,
      userId,
      flow: deflate(JSON.stringify(flow)),
      displayName,
    };
    const { data, error } = await this.client
      .from('flows')
      .select('flow')
      .eq('id', deflatedFlow.id)
      .eq('user_id', deflatedFlow.userId)
      .eq('display_name', deflatedFlow.displayName);
    if (error) {
      console.error('Error checking if flow changed:', error);
      return false;
    } else {
      const flowChanged = !data || data.length === 0;
      return flowChanged;
    }
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
    flow.displayName = displayName;
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
      this.flowsDeflated = [
        ...this.flowsDeflated.filter((flow) => flow.id !== id),
        deflatedFlow,
      ];
      await this.updateFlows();
    }
  }

  public async renameFlow(id: string, displayName: string): Promise<void> {
    const { error } = await this.client
      .from('flows')
      .update({ display_name: displayName })
      .eq('id', id);
    if (error) {
      console.error('Error renaming flow:', error);
    } else {
      this.flowsDeflated = this.flowsDeflated.map((flow) => {
        if (flow.id === id) {
          flow.displayName = displayName;
        }
        return flow;
      });
      await this.updateFlows();
    }
  }

  public async deleteFlow(id: string): Promise<void> {
    const { error } = await this.client.from('flows').delete().eq('id', id);
    if (error) {
      console.error('Error deleting flow:', error);
    } else {
      this.flowsDeflated = this.flowsDeflated.filter((flow) => flow.id !== id);
      await this.updateFlows();
    }
  }

  public async saveSettings(settings: Settings): Promise<void> {
    const session = await this.getSession();
    const user_id = session.data?.session?.user?.id;
    const { error } = await this.client.from('settings').upsert({
      user_id,
      settings: {
        openAiUseOwnKey: settings.openAiUseOwnKey,
        remoteRunnerEnabled: settings.remoteRunnerEnabled,
        remoteRunnerIp: settings.remoteRunnerIp,
        remoteRunnerPort: settings.remoteRunnerPort,
        openai: settings.openAiKey,
      },
    });
    if (error) {
      console.error('Error saving settings:', error);
    }
  }

  public async getSettings(): Promise<Settings | null> {
    const { data, error } = await this.client
      .from('decrypted_settings')
      .select('*');
    if (error) {
      console.error(`Error fetching settings:`, error);
      return null;
    } else {
      const settings = {
        ...data[0].settings,
        openAiKey: data[0].settings.openai,
      };
      return settings;
    }
  }
}

export const supabase = new Supabase();
