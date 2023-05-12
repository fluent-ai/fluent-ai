import { textInput } from './textInput';

describe('FlowRunner nodeMethods - input', () => {
  it('should pass a string from props to msg', async () => {
    const inputProps = {
      input: 'Hello, world!',
    };
    const mockMsg = {};

    const result = await textInput(mockMsg, inputProps);

    expect(result?.['payload']).toBe('Hello, world!');
  });

  it('should reject when props.input is not a string', async () => {
    const inputProps = {
      input: 123,
    };
    const mockMsg = {};

    // @ts-expect-error - testing invalid input
    await expect(textInput(mockMsg, inputProps)).rejects.toThrow(
      'props.input is not a string'
    );
  });
});
