import { template } from './template';

describe('FlowRunner nodeMethods - Template', () => {
  it('should render a Mustache template', async () => {
    const args = {
      globals: { emoji: '👋' },
      inputs: {
        template:
          'My name is {{msg.payload.name}} and I am {{msg.payload.age}} years old {{globals.emoji}}',
      },
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await template(args);
    expect(result?.['payload']).toEqual(
      'My name is John and I am 30 years old 👋'
    );
  });

  it('should reject with an error if props.template is not a string', async () => {
    const args = {
      globals: { emoji: '👋' },
      inputs: {
        template: 123,
      },
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await template(args);
    expect(result?.['error']).toEqual(
      'inputs.template either doesnt exist or is not a string'
    );
  });

  it('should return an error if input.template doesnt exist', async () => {
    const args = {
      globals: { emoji: '👋' },
      inputs: {},
      msg: { payload: { name: 'John', age: 30 } },
    };
    const result = await template(args);
    expect(result?.['error']).toEqual(
      'inputs.template either doesnt exist or is not a string'
    );
  });

  // Mustache.render doesn't throw an error if a variable is missing
  // it('should reject with an error if Mustache render throws an error', async () => {
  //   const msg = {};
  //   const props = {
  //     template: 'My name is {{msg.name}} and I am {{msg.age}} years old',
  //   }; // missing variable
  //   await expect(template(msg, props)).rejects.toThrow();
  // });
  // Use a helper like so
  // var template = "{{#exists foo}}{{foo}}{{/exists}}";
  // Mustache.registerHelper('exists', function(variable, options) {
  //   if (typeof variable !== 'undefined') {
  //     return options.fn(this);
  //   } else {
  //     throw new Error('Variable not defined: ' + options.name);
  //   }
  // });
});
