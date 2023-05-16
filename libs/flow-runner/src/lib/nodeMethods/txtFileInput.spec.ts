import { txtFileInput } from './txtFileInput';

describe('FlowRunner nodeMethods - input', () => {
  it('should pass a string from props to msg', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: { payload: 'Oh what a nice string!' },
    };
    const result = await txtFileInput(args);
    expect(result?.['payload']).toBe(args.msg.payload);
  });

  it('should return an error on invalid input', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: {},
    };
    const result = await txtFileInput(args);
    expect(result?.['error']).toEqual('Input must exist and be a string');
  });
});
