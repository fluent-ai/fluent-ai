import React, { useEffect, useState } from 'react'
import { Node, Edge } from 'reactflow'
import * as nodeMethods from './nodeMethods'

export interface Flow {
  nodes: Node[];
  edges: Edge[];
}

// structuredClone pollyfill for Jest
const structuredClone = (obj: Record<string, unknown>) => {
  return JSON.parse(JSON.stringify(obj))
}

const findNode = (nodes : Node[] | undefined, id: string): Node | undefined => {
  return nodes?.find((node) => node.id === id)
}

const isRootNode = (edges: Edge[] | undefined, nodeId:string): boolean => {
  return !edges?.find((edge) => edge.target === nodeId)
}

interface IFlowRunnerNodeChildren {
  id: string;
  nodeChildren: string[];
}

export interface IFlowRunnerOutputs {
  id: string;
  nodeOutputs:  Record<string, unknown>;
}

export interface IFlowRunnerInputs {
  id: string;
  nodeInputs:  Record<string, unknown>;
}

export interface IFlowRunnerStates {
  id: string;
  state: Record<string, unknown>;
}

export interface IMethodArguments {
  globals?: Record<string, unknown>;
  inputs?: Record<string, unknown>;
  msg: Record<string, unknown>;
}


export const useFlowRunner = (): {
  setFlow: ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => void
  executeFlow: () => Promise<void>
  setInputs: (inputs: IFlowRunnerInputs[]) => void
  setGlobals: (globals: Record<string, unknown>) => void
  globals: Record<string, unknown>
  outputs: IFlowRunnerOutputs[]
  states: IFlowRunnerStates[]
} => {
  const [flow, setFlow] = useState<Flow>()
  const [nodeChildrenStore, setNodeChildrenStore] = useState<IFlowRunnerNodeChildren[]>([])
  const [inputs, setInputs] = useState<IFlowRunnerInputs[]>([])
  const [outputs, setOutputs] = useState<IFlowRunnerOutputs[]>([])
  const [states, setStates] = useState<IFlowRunnerStates[]>([])
  const [globals, setGlobals] = useState<Record<string, unknown>>({})

  useEffect(() => {
    console.log('🌊🪝 Inputs mutated to: ', inputs)
  }, [inputs])


  //when nodes or edges change, rebuild the links between parents and children
  useEffect(() => {
    const newNodeChildrenStore:IFlowRunnerNodeChildren[] = []

    flow?.nodes.forEach((node) => {
      newNodeChildrenStore.push({
        id: node.id,
        nodeChildren: []
      })
    })    

    flow?.edges?.forEach((edge) => {
      const sourceNode = findNode(flow?.nodes, edge.source)
      const targetNode = findNode(flow?.nodes, edge.target)

      if (sourceNode && targetNode) {
        // add target id to source children
        newNodeChildrenStore
          .find((child) => child.id === sourceNode.id)
          ?.nodeChildren.push(targetNode.id)

      } else {
        console.warn(
          `🌊🪝🚨 Invalid Edge. Source node ${edge.source} or target node ${edge.target} not found`
        )
      }
    })
    console.log('🌊🪝 built new nodeChildrenStore\n', newNodeChildrenStore);
    setNodeChildrenStore(newNodeChildrenStore)
  }, [flow])

  /**
   * Execute the flow.
   */
  const executeFlow = async () => {
    console.log('🌊🪝 call to executeFlow()')
    const rootNodes = flow?.nodes.filter((node) => isRootNode(flow?.edges, node.id))
    // Start the execution by triggering executeNode on each root
    if (rootNodes) {
      const promises = rootNodes.map((rootNode) => executeNode(rootNode, {}));
      await Promise.allSettled(promises);
    }
  }

  /**
   * Execute a node.
   */
  const executeNode = (
    node: Node,
    msg: Record<string, unknown>
  ) => {
    return new Promise((resolve) => {
      console.log('🌊🪝 In executeNode, Inputs is now :', inputs)
      // look up the node method
      let method;
      try {
        method = nodeMethods[node.type as keyof typeof nodeMethods]
      } catch (error) {
        console.warn(`🌊🪝🚨 Node type ${node.type} not found`)
      }
      if (method) {
        // set node state to running
        setStates((prevStates) => [
          ...prevStates.filter((state) => state.id !== node.id),
          { id: node.id, state: { status: 'running' } }
        ]);
        // execute the node method 
        console.log(`🌊🪝 executing node ${node.id}`)
        method({
          globals,
          inputs: inputs.find((input) => input.id === node.id)?.nodeInputs || {},
          msg,
        }).then((msg) => {
          // save the output    
          setOutputs((prevOutputs) => [
            ...prevOutputs.filter((output) => output.id !== node.id),
            { id: node.id, nodeOutputs: structuredClone(msg) }
          ]);
          // save the state. If error exists on msg, set state to error, otherwise set it to done
          setStates((prevStates) => [
            ...prevStates.filter((state) => state.id !== node.id),
            { id: node.id, state: { status: 'done' } }
          ]);
          // strip error from msg
          delete msg.error
          //call executeNode on each child
          const childPromises:Promise<unknown>[] = []
          nodeChildrenStore.find((nodeChildren) => nodeChildren.id === node.id)?.nodeChildren.forEach((childId) => {
            const childNode = findNode(flow?.nodes, childId)
            if (childNode) {
              childPromises.push(executeNode(childNode, msg))
            } else {
              console.warn(`🌊🪝🚨 Node ${childId} not found`)
            }
          })
          Promise.allSettled(childPromises).then(() => {
            resolve(null)
          })
        })
      } else {
        console.warn(`🌊🪝🚨 Method for node type ${node.type} not found`)
      }
    })
  }

  return {
    setFlow,
    setInputs, 
    setGlobals,
    executeFlow,
    globals,
    outputs,
    states,
  }
}



