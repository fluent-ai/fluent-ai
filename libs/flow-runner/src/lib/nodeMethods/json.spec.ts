import { json } from './json';

describe('FlowRunner nodeMethods - JSON', () => {
  it('should convert a string to JSON', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: { payload: '{"name": "John", "age": 30}' },
    };
    const result = await json(args);
    expect(result?.['payload']).toEqual({ name: 'John', age: 30 });
  });

  it('should an object into a string', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await json(args);
    expect(result?.['payload']).toEqual('{"name":"John","age":30}');
  });

  it('should return an error if msg does not contain payload', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: {},
    };
    const result = await json(args);
    expect(result?.['error']).toEqual(
      'JSON node expects msg object to include a payload'
    );
  });
});
