import { download } from './download';

describe('FlowRunner nodeMethods - Download', () => {
  it('should return the input message unchanged', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await download(args);
    expect(result).toEqual(args.msg);
  });
});
