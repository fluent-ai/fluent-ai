export enum NodeType {
  Input = 'input',
  Output = 'output',
  TextToUpperCase = 'texttouppercase',
  CSVInput = 'csvinput',
  Template = 'template',
  API = 'api',
  Custom = 'custom',
}

export interface FlowNode {
  id: string;
  type: NodeType;
  stringifiedData: string;
  position: {
    x: number;
    y: number;
  };
}

export interface FlowEdge {
  id: string;
  sourceId: string;
  targetId: string;
}
