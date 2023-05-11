import { useEffect, useState } from 'react'
import { Node, Edge } from 'reactflow'
import { input as methodInput } from './nodeMethods/input'
import { output as methodOutput } from './nodeMethods/output'
import { template as methodTemplate } from './nodeMethods/template'
import { json as methodJson } from './nodeMethods/json'
import { userFunction as methodUserFunction } from './nodeMethods/userFunction'
import { preview as methodPreview } from './nodeMethods/preview'

// structuredClone pollyfill for Jest
const structuredClone = (obj: Record<string, unknown>) => {
  return JSON.parse(JSON.stringify(obj))
}

export interface IMethod {
  (msg: Record<string, unknown>, properties?: Record<string, unknown>): Promise<Record<string, unknown>>;
}

export interface IExecutionNode extends Node {
  method?: IMethod;
  props?: Record<string, unknown>;
  msg?: Record<string, unknown>;
  callbacks?: Array<(msg: Record<string, unknown>) => void>;
}

export interface IFlow {
  nodes: IExecutionNode[];
  edges: Edge[];
}

const findNode = (nodes : IExecutionNode[], id: string): IExecutionNode | undefined => {
  return nodes.find((node) => node.id === id)
}

const isRootNode = (flow: IFlow, id:string): boolean => {
  return !flow.edges.find((edge) => edge.target === id)
}

const lookupMethod = (type: string | undefined) => {
  switch (type) {
    case 'input':
      return methodInput
    case 'output':
      return methodOutput
    case 'template':
      return methodTemplate
    case 'json':
      return methodJson
    case 'userFunction':
      return methodUserFunction
    case 'preview':
      return methodPreview
    default:
      console.error(`🚨 useFlowRunner : Node type ${type} not found`)
  }
}


export const useFlowRunner = (): {
  flow: IFlow
  setFlow: ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => void
  executeFlow: () => Promise<void>
  runnerNodes: IExecutionNode[]
} => {
  
  const [runnerNodes, setRunnerNodes] = useState<IExecutionNode[]>([])
  const [flow, setFlow] = useState<IFlow>({nodes: [], edges: []});


  useEffect(() => {
    // @ts-expect-error - pollyfill
    let newNodes = structuredClone(flow.nodes) as unknown as IExecutionNode[];
    newNodes = newNodes.map((node) => ({
      ...node,
      type: node.type,
      msg: {},
      callbacks: [],
      method: lookupMethod(node.type),
    }) as unknown as IExecutionNode)

    //Register callbacks
    flow.edges.forEach((edge) => {
      const sourceNode = findNode(newNodes, edge.source)
      const targetNode = findNode(newNodes, edge.target)

      if (sourceNode && targetNode) {
        sourceNode.callbacks?.push((msg: Record<string, unknown>) => {
          executeNode(targetNode, msg)
        })
      } else {
        throw new Error(
          `🚨 Source node ${edge.source} or target node ${edge.target} not found`
        )
      }
    })

    setRunnerNodes(newNodes)
  }, [flow])



  /**
   * Execute the flow.
   */
  const executeFlow = async (): Promise<void> => {
    const rootNodes = runnerNodes.filter((node) => isRootNode(flow, node.id))

    // Start the execution by triggering executeNode on each root
    await Promise.all(
      rootNodes.map((rootNode) => executeNode(rootNode, {}))
    )
  }

  /**
   * Execute a node.
   */
  const executeNode = async (
    node: IExecutionNode,
    msg: Record<string, unknown>
  ): Promise<void> => {
    if(node.method) {
      await node.method(msg, node.props).then((msg) => {
        node.msg =  structuredClone(msg);
        node.callbacks?.forEach((callback) => callback(structuredClone(msg)))
      });
    }
  }

  return { flow, setFlow, executeFlow, runnerNodes }
}

