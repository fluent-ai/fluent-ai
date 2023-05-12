import { openAi } from './openAi';

describe('FlowRunner nodeMethods - openAi', () => {
  it('should respond to a request', async () => {
    const msg = { payload: 'Please say hello' };
    const result = await openAi(msg);
    expect(typeof result?.['payload']).toBe('string');
  }, 10000);
});
