import { json } from './json';

describe('FlowRunner nodeMethods - JSON', () => {
  it('should convert a string to JSON', async () => {
    const msg = { payload: '{"name": "John", "age": 30}' };
    const result = await json(msg);
    expect(result?.['payload']).toEqual({ name: 'John', age: 30 });
  });

  it('should an object into a string', async () => {
    const msg = { payload: { name: 'John', age: 30 } };
    const result = await json(msg);
    expect(result?.['payload']).toEqual('{"name":"John","age":30}');
  });
});
