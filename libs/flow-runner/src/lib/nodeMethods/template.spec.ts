import { template } from './template';

describe('FlowRunner nodeMethods - Template', () => {
  it('should render a Mustache template with the input message and data', async () => {
    const msg = { name: 'John', age: 30 };
    const data = {
      template: 'My name is {{msg.name}} and I am {{msg.age}} years old',
    };
    const result = await template(msg, data);
    expect(result?.['payload']).toEqual(
      'My name is John and I am 30 years old'
    );
  });

  it('should reject with an error if data.template is not a string', async () => {
    const msg = { name: 'John', age: 30 };
    const data = { template: 123 }; // not a string
    //@ts-expect-error - testing invalid input
    await expect(template(msg, data)).rejects.toThrow(
      'data.template is not a string'
    );
  });

  // Mustache.render doesn't throw an error if a variable is missing
  // it('should reject with an error if Mustache render throws an error', async () => {
  //   const msg = {};
  //   const data = {
  //     template: 'My name is {{msg.name}} and I am {{msg.age}} years old',
  //   }; // missing variable
  //   await expect(template(msg, data)).rejects.toThrow();
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
