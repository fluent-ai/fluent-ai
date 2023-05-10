import { input } from './input';

describe('nodeMethods', () => {
  describe('input', () => {
    it('should pass a string from data to msg', async () => {
      const inputData = {
        input: 'Hello, world!',
      };
      const mockMsg = {};

      const result = await input(mockMsg, inputData);

      expect(result?.['payload']).toBe('Hello, world!');
    });

    it('should reject when data.input is not a string', async () => {
      const inputData = {
        input: 123,
      };
      const mockMsg = {};

      // @ts-ignore
      await expect(input(mockMsg, inputData)).rejects.toThrow(
        'data.input is not a string'
      );
    });
  });
});
