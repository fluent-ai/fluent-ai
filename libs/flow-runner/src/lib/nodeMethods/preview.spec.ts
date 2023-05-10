import { preview } from './preview';

describe('FlowRunner nodeMethods - Preview', () => {
  it('should return the input message unchanged', async () => {
    const msg = { name: 'John', age: 30 };
    const result = await preview(msg);
    expect(result).toEqual(msg);
  });
});
