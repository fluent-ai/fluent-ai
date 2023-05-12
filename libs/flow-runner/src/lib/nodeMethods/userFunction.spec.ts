import { userFunction } from './userFunction';

describe('FlowRunner nodeMethods - userFunction', () => {
  it('should execute a valid user script and merge the result into the input message', async () => {
    const msg = { name: 'John', age: 30 };
    const props = {
      userFunction: 'return { surname: "Doe", age: msg.age * 2 };',
    };
    const result = await userFunction(msg, props);
    expect(result).toEqual({ name: 'John', surname: 'Doe', age: 60 });
  });

  it('should reject with an error if props.userFunction is not a string', async () => {
    const msg = { name: 'John', age: 30 };
    const props = { userFunction: 123 }; // not a string
    //@ts-expect-error - testing invalid input
    await expect(userFunction(msg, props)).rejects.toBe(
      'props.userFunction is not a string'
    );
  });

  it('should reject with an error if the user script includes a disallowed word', async () => {
    const msg = { name: 'John', age: 30 };
    const props = { userFunction: "import 'evil-package'" }; // disallowed word
    const response = await userFunction(msg, props);
    expect(response).toHaveProperty('error');
  });

  it('should reject with an error if the user script throws an error', async () => {
    const msg = { name: 'John', age: 30 };
    const props = { userFunction: 'throw new Error("Oops");' }; // throws an error
    const response = await userFunction(msg, props);
    expect(response).toHaveProperty('error');
  });
});
