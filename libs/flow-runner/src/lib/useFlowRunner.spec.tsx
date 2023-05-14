import { renderHook, act } from '@testing-library/react-hooks'
import { useFlowRunner } from './useFlowRunner'
import { nodes as mockNodes, edges as mockEdges, inputs as mockInputs } from './useFlowRunner.mocks'

describe('useFlowRunner', () => {
  let flowRunner: ReturnType<typeof useFlowRunner>

  beforeEach(() => {
    renderHook(() => {
      flowRunner = useFlowRunner()
    })
    act(() => {
      const data = { nodes: mockNodes, edges: mockEdges}
      flowRunner.setFlow(data)
      flowRunner.setInputs(mockInputs)
      flowRunner.setGlobals({ openAiApiKey: process.env.NX_OPENAI_API_KEY })
    })
  })

  it('should throw an error while building the tree for invalid edges', async () => {
    const invalidNodes = [
      {
        id: '1',
        type: 'textInput',
      },
      {
        id: '2',
        type: 'json',
      }
    ]
    const invalidEdges = [
      {
        id: 'e1-3',
        source: '1',
        target: '3',
      }
    ]
        
    const consoleErrorSpy = jest.spyOn(console, 'warn').mockImplementation()

    await act(async () => {
      // @ts-expect-error - purposefully invalid
      flowRunner.setFlow({ nodes: invalidNodes, edges: invalidEdges })
    })

    //check that the error was logged to the console
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Invalid Edge')
    )
  
    consoleErrorSpy?.mockRestore()
    
  })

  it('should execute a flow', async () => {
    await act(async () => {
      await flowRunner.executeFlow()
    })
      console.log(`🌈 flowRunner`, JSON.stringify(flowRunner, null, 2))
    },20000)


        


})