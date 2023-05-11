import { input } from './input';

describe('FlowRunner nodeMethods - input', () => {
  it('should pass a string from props to msg', async () => {
    const inputProps = {
      input: 'Hello, world!',
    };
    const mockMsg = {};

    const result = await input(mockMsg, inputProps);

    expect(result?.['payload']).toBe('Hello, world!');
  });

  it('should reject when props.input is not a string', async () => {
    const inputProps = {
      input: 123,
    };
    const mockMsg = {};

    // @ts-expect-error - testing invalid input
    await expect(input(mockMsg, inputProps)).rejects.toThrow(
      'props.input is not a string'
    );
  });
});
