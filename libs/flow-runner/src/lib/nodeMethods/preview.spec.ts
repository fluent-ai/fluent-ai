import { preview } from './preview';

describe('FlowRunner nodeMethods - Preview', () => {
  it('should return the input message unchanged', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await preview(args);
    expect(result).toEqual(args.msg);
  });
});
