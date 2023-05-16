import { imageFileInput } from './imageFileInput';

describe('FlowRunner nodeMethods - input', () => {
  it('should pass a string from props to msg', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: { payload: 'Oh what a nice string!' },
    };
    const result = await imageFileInput(args);
    expect(result?.['payload']).toBe(args.msg.payload);
  });

  it('should return an error on invalid input', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: {},
    };
    const result = await imageFileInput(args);
    expect(result?.['error']).toEqual(
      'Image must exist and be encoded as a string'
    );
  });
});
