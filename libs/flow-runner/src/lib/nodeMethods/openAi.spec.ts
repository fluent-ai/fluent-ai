import { openAi } from './openAi';

describe('FlowRunner nodeMethods - openAi', () => {
  it('should respond to a request', async () => {
    const args = {
      globals: { openAiApiKey: process.env.NX_OPENAI_API_KEY },
      inputs: {},
      msg: { payload: 'Please say hello' },
    };
    const result = await openAi(args);
    expect(typeof result?.['payload']).toBe('string');
  }, 10000);

  it('should return an error if msg.payload is not a string', async () => {
    const args = {
      globals: { openAiApiKey: process.env.NX_OPENAI_API_KEY },
      inputs: {},
      msg: {},
    };
    const result = await openAi(args);
    expect(result?.['error']).toEqual(
      'msg.payload either doesnt exist or is not a string'
    );
  });
});
