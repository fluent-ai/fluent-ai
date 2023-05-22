import { userFunction } from './userFunction';

describe('FlowRunner nodeMethods - userFunction - usage errors', () => {
  it('should execute a valid user script and merge the result into the input message', async () => {
    const args = {
      globals: { emoji: '👋' },
      inputs: {
        userFunction: `
          msg.payload.surname = "Doe";
          msg.payload.age = msg.payload.age * 2;
          msg.payload.emoji = globals.emoji;
          return msg;
          `,
      },
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await userFunction(args);
    expect(result).toEqual({
      payload: {
        name: 'John',
        surname: 'Doe',
        age: 60,
        emoji: args.globals.emoji,
      },
    });
  });

  it('should resolve with an error if props.userFunction is not a string', async () => {
    const args = {
      globals: {},
      inputs: {},
      msg: {},
    };
    const result = await userFunction(args);
    expect(result?.['error']).toEqual(
      'inputs.userFunction either doesnt exist or is not a string'
    );
  });

  it('should resolve with an error if the user script includes a disallowed word', async () => {
    const args = {
      globals: {},
      inputs: {
        userFunction: `
          import 'evil library
          return msg;
          `,
      },
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await userFunction(args);
    expect(result).toHaveProperty('error');
  });

  it('should resolve with an error if the user script throws an error', async () => {
    const args = {
      globals: { emoji: '👋' },
      inputs: {
        userFunction: `
          throw new Error("Oops");
          `,
      },
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await userFunction(args);
    expect(result).toHaveProperty('error');
  });
});
