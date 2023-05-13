import { deeplAi } from './deeplAi';

describe('FlowRunner nodeMethods - deeplAi', () => {
  it('should respond to a request', async () => {
    const msg = { payload: 'wie geht es dir?' };
    const result = await deeplAi(msg, {});
    //expect the result to be have a type string
    expect(typeof result?.['payload']).toBe('string');
    // expect(result?.['payload']).to
  }, 50000);

  //   it('should reject with an error if props.template is not a string', async () => {
  //     const msg = { name: 'John', age: 30 };
  //     const props = { template: 123 }; // not a string
  //     //@ts-expect-error - testing invalid input
  //     await expect(template(msg, props)).rejects.toThrow(
  //       'props.template is not a string'
  //     );
  //   });

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
