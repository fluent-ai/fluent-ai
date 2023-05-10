/* eslint-disable no-console */

import { IExecutionNode } from '@tool-ai/flow-runner'
import { Node, Edge } from 'reactflow'

import { input as methodInput } from './nodeMethods/input.js'
import { output as methodOutput } from './nodeMethods/output.js'
import { textToUpperCase as methodTextToUpperCase } from './nodeMethods/textToUpperCase.js'
import { template as methodTemplate } from './nodeMethods/template.js'
import { json as methodJson } from './nodeMethods/json.js'
import { userFunction as methodUserFunction } from './nodeMethods/userFunction.js'

export class FlowRunner {
  private _nodes: IExecutionNode[]
  private _edges: Edge[]


  constructor() {
    this._nodes = []
    this._edges = []
  }

  public get nodes(): IExecutionNode[] {
    return this._nodes
  }
  private set nodes(value: IExecutionNode[]) {
    this._nodes = value
  }
  public get edges(): Edge[] {
    return this._edges
  }
  private set edges(value: Edge[]) {
    this._edges = value
  }
  

  /**
   * Syncs the FlowRunner state with the provided nodes and edges.
   */
  public sync({ nodes, edges }: { nodes: Node[]; edges: Edge[] }): void {
    this.edges = edges

    // initialize the nodes with callbacks and load the process method
    this.nodes = []
    nodes.forEach(node => {
      this.nodes.push({
        ...node,
        type: node.type,
        callbacks: [],
        method: this.lookupMethod(node.type),
      })
    })

    this.registerCallbacks()
  }

  /**
   * Execute the flow.
   */
  public async executeFlow() {
    const rootNodes = this.nodes.filter(node => this.isRootNode(node))

    // Start the execution by triggering executeNode on each root
    rootNodes.forEach(rootNode => {
      console.log(`🌳 Triggering root node ${rootNode.id}`)
      this.executeNode(rootNode, {})
    })
  }

  /**
   * Execute a node.
   */
  public async executeNode(node: IExecutionNode, msg: Record<string, unknown>) {
    console.log(`🏃 Running ${node.type} node with id ${node.id}`)
    node.method(msg, node.data).then(msg => {
      node.callbacks.forEach(callback => callback(msg))
    })
  }

  /**
   * Register the callbacks for each node based on the edges.
   */
  private registerCallbacks() {
    this.edges.forEach(edge => {
      const sourceNode = this.findNode(edge.source)
      const targetNode = this.findNode(edge.target)

      if (sourceNode && targetNode) {
        console.log(`🔗 Registering callback for node ${targetNode.id} with node ${sourceNode.id}`)
        sourceNode.callbacks.push((msg: Record<string, unknown>) => {
          console.log(`✨ Triggering node ${targetNode.id}`)
          this.executeNode(targetNode, msg)
        })
      } else {
        throw new Error(`🚨 Source node ${edge.source} or target node ${edge.target} not found`)
      }
    })
  }

  public findNode(id: string): IExecutionNode | undefined {
    return this.nodes.find(node => node.id === id)
  }

  public isRootNode(node: IExecutionNode): boolean {
    return !this.edges.find(edge => edge.target === node.id)
  }

  private lookupMethod(type: string | undefined) {
    switch (type) {
    case 'input':
      return methodInput
    case 'output':
      return methodOutput
    case 'textToUpperCase':
      return methodTextToUpperCase
    case 'template':
      return methodTemplate
    case 'json':
      return methodJson
    case 'userFunction':
      return methodUserFunction
    default:
      throw new Error(`Node type ${type} not found`)
    }
  }
}
