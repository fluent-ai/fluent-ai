// node method types
export * from './lib/nodeMethods/input';
export * from './lib/nodeMethods/json';
export * from './lib/nodeMethods/output';
export * from './lib/nodeMethods/template';
export * from './lib/nodeMethods/textToUpperCase';
export * from './lib/nodeMethods/userFunction';

// Interfaces for nodes
export interface IExecutionNode {
  id?: string; //UUID
  type: string | undefined;
  handles?: {
    source: [id: string];
    target: [id: string];
  };
  method(
    msg: Record<string, unknown>,
    properties?: Record<string, unknown>
  ): Promise<Record<string, unknown>>;
  data: Record<string, unknown>;
  callbacks: Array<(msg: Record<string, unknown>) => void>;
  position?: { x: number; y: number };
}
