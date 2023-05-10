import { output } from './output';

describe('nodeMethods', () => {
  describe('output function', () => {
    test('returns the input message unchanged', async () => {
      const msg = { name: 'John', age: 30 };
      const result = await output(msg);
      expect(result).toEqual(msg);
    });
  });
});
