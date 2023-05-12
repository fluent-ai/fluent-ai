import { renderHook, act } from '@testing-library/react-hooks'
import { useFlowRunner } from './useFlowRunner'
import { nodes as mockNodes, edges as mockEdges } from './useFlowRunner.mocks'

describe('useFlowRunner', () => {
  let flowRunner: ReturnType<typeof useFlowRunner>

  beforeEach(() => {
    renderHook(() => {
      flowRunner = useFlowRunner()
    })
    act(() => {
      flowRunner.setFlow({ nodes: mockNodes, edges: mockEdges })
    })
  })

  it('should throw an error if node type is not found', async () => {
    const invalidNodes = [
      {
        id: '1',
        type: 'invalid',
      }
    ]
        
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    await act(async () => {
      // @ts-expect-error - purposefully invalid
      flowRunner.setFlow({ nodes: invalidNodes, edges: mockEdges })
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Node type invalid not found/)
    )
  
    consoleErrorSpy?.mockRestore()
    
  })

  it('should have nodes & edges after syncing', () => {
    expect(flowRunner.flow.nodes.length).toBe(8)
    expect(flowRunner.flow.edges.length).toBe(7)
  })


it('should create a msg prop on nodes', () => {  
  const node1 = flowRunner.flow.nodes.find((node) => node.id === '1')
  const node3 = flowRunner.flow.nodes.find((node) => node.id === '3')
  const node5 = flowRunner.flow.nodes.find((node) => node.id === '5')

  expect(node1?.msg).toBeDefined()
  expect(node3?.msg).toBeDefined()
  expect(node5?.msg).toBeDefined()

  })


  it('should assign callbacks for linked nodes', () => {
    const node1 = flowRunner.flow.nodes.find((node) => node.id === '1')
    const node3 = flowRunner.flow.nodes.find((node) => node.id === '3')
    const node5 = flowRunner.flow.nodes.find((node) => node.id === '5')

    // @ts-expect-error - callbacks are normally private
    expect(node1?.callbacks.length).toBe(1)
    // @ts-expect-error - callbacks are normally private
    expect(node3?.callbacks.length).toBe(2)
    // @ts-expect-error - callbacks are normally private
    expect(node5?.callbacks.length).toBe(0)
  })


  it('should execute a flow', async () => {
    await act(async () => {
      await flowRunner.executeFlow()
    })
    
    const node2 = flowRunner.flow.nodes.find((node) => node.id === '2')
    // @ts-expect-error - msg is normally private
    expect(node2?.msg?.payload?.name).toBe('Mr Wiggles')
    // @ts-expect-error - msg is normally private
    expect(node2?.msg?.payload?.color).toBe('pink')
    // @ts-expect-error - msg is normally private
    expect(node2?.msg?.payload?.balloons).toBe(true)

    const node6 = flowRunner.flow.nodes.find((node) => node.id === '6')
    // @ts-expect-error - msg is normally private
    expect(node6?.msg?.payload?.number).toBe(6)

    })


        


})