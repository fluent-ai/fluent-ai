import { useState } from 'react'
import { Node, Edge } from 'reactflow'
import { input as methodInput } from './nodeMethods/input'
import { output as methodOutput } from './nodeMethods/output'
import { template as methodTemplate } from './nodeMethods/template'
import { json as methodJson } from './nodeMethods/json'
import { userFunction as methodUserFunction } from './nodeMethods/userFunction'
import { preview as methodPreview } from './nodeMethods/preview'

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


export const useFlowRunner = (): {
  sync: ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => void
  executeFlow: () => Promise<void>
} => {
  const [nodes, setNodes] = useState<IExecutionNode[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  /**
   * Syncs the FlowRunner state with the provided nodes and edges.
   */
  const sync = ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }): void => {
    setEdges(edges)

    // initialize the nodes with callbacks and load the process method
    setNodes(
      nodes.map((node) => ({
        ...node,
        type: node.type,
        callbacks: [],
        method: lookupMethod(node.type),
      }))
    )

    registerCallbacks()
  }

  /**
   * Execute the flow.
   */
  const executeFlow = async (): Promise<void> => {
    const rootNodes = nodes.filter((node) => isRootNode(node))

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
    await node.method(msg, node.data).then((msg) => {
      node.callbacks.forEach((callback) => callback(msg))
    })
  }

  /**
   * Register the callbacks for each node based on the edges.
   */
  const registerCallbacks = (): void => {
    edges.forEach((edge) => {
      const sourceNode = findNode(edge.source)
      const targetNode = findNode(edge.target)

      if (sourceNode && targetNode) {
        sourceNode.callbacks.push((msg: Record<string, unknown>) => {
          executeNode(targetNode, msg)
        })
      } else {
        throw new Error(
          `🚨 Source node ${edge.source} or target node ${edge.target} not found`
        )
      }
    })
  }

  const findNode = (id: string): IExecutionNode | undefined => {
    return nodes.find((node) => node.id === id)
  }

  const isRootNode = (node: IExecutionNode): boolean => {
    return !edges.find((edge) => edge.target === node.id)
  }

  const lookupMethod = (type: string | undefined) => {
    switch (type) {
      case 'input':
        return methodInput
      case 'output':
        return methodOutput
      case 'templateNode':
        return methodTemplate
      case 'json':
        return methodJson
      case 'userFunction':
        return methodUserFunction
      case 'preview':
        return methodPreview
      default:
        throw new Error(`Node type ${type} not found`)
    }
  }

  return { sync, executeFlow }
}

