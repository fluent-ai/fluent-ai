import { render } from '@testing-library/react';

import FlowRunner from './useFlowRunner';

describe('FlowRunner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlowRunner />);
    expect(baseElement).toBeTruthy();
  });
});


import { IExecutionNode } from '@tool-ai/flow-runner'
import { nodes, edges } from './FlowRunner.mocks';
import { FlowRunner } from './FlowRunner';



describe('FlowRunner', () => {

  let flowRunner: FlowRunner

  beforeEach(() => {
    flowRunner = new FlowRunner()
    flowRunner.sync({ nodes, edges })
  })

  it('should successfully construct', () => {
    expect(flowRunner).not.toBeNull();
  });

  it('should have nodes & edges after syncing', () => {
    expect(flowRunner.nodes.length).toBe(8)
    expect(flowRunner.edges.length).toBe(7)
  })

  it('should overwrite existing data on sync', () => {
    flowRunner.sync({ nodes, edges })
    expect(flowRunner.nodes.length).toBe(8)
    expect(flowRunner.edges.length).toBe(7)
  })

  it('should be able to find nodes by id', () => {
    const node1 = flowRunner.findNode('1')
    const node5 = flowRunner.findNode('5')
    const node7 = flowRunner.findNode('7')
    const invalidNode = flowRunner.findNode('invalid-id')

    expect(node1?.id).toBe('1')
    expect(node5?.id).toBe('5')
    expect(node7?.id).toBe('7')
    expect(invalidNode).toBeUndefined()
  })

  it('should be able to determine if a node is a root', () => {
    const rootNode = flowRunner.findNode('1')
    const nonRootNode = flowRunner.findNode('2')

    const isRootNode = flowRunner.isRootNode(rootNode!)
    const isNonRootNode = flowRunner.isRootNode(nonRootNode!)

    expect(isRootNode).toBe(true)
    expect(isNonRootNode).toBe(false)
  })

  it('should assign callbacks for linked nodes', () => {
    const node1 = flowRunner.findNode('1')
    const node3 = flowRunner.findNode('3')
    const node5 = flowRunner.findNode('5')

    expect(node1?.callbacks.length).toBe(1)
    expect(node3?.callbacks.length).toBe(2)
    expect(node5?.callbacks.length).toBe(0)
  })

  it('should be able to execute a node', async () => {
    const node7 = flowRunner.findNode('7')!
  

    const mockMethod = jest.fn().mockResolvedValue({})

    node7.method = mockMethod

    await flowRunner.executeNode(node7, {})

    expect(mockMethod).toHaveBeenCalledTimes(1)
  })

  it('should trigger root nodes on execution', async () => {
    const rootNode1 = flowRunner.findNode('1')!
    const rootNode2 = flowRunner.findNode('8')!
  
    const mockExecuteNode = jest.spyOn(flowRunner, 'executeNode')
  
    await flowRunner.executeFlow()
  
    expect(mockExecuteNode).toHaveBeenCalledTimes(2)
    expect(mockExecuteNode).toHaveBeenCalledWith(rootNode1, {})
    expect(mockExecuteNode).toHaveBeenCalledWith(rootNode2, {})
  })
  

});
