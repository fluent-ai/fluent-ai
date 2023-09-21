import { IMethodArguments } from '../useFlowRunner';

async function runUserScript(
  userScript: string,
  context: Record<string, unknown>
) {
  const disallowedWords = [
    'import',
    'require',
    'eval',
    'window',
    'alert',
    'document',
  ];

  for (const word of disallowedWords) {
    if (userScript.includes(word)) {
      return { error: `"${word}" is not allowed in user scripts` };
    }
  }

  userScript = '"use strict";\n' + userScript;

  let scriptFunction;
  try {
    // eslint-disable-next-line no-new-func -- explicitly allowing user code to be run, so this is fine
    scriptFunction = new Function(
      'globals',
      'msg',
      `return (async function(){ ${userScript} })();`
    );
  } catch (error) {
    console.log('🚨 Error parsing user script', error);
    return { error: 'Error parsing user script\n' + error };
  }

  let response = {};

  try {
    // Save original handler
    const originalHandler = window.onunhandledrejection;

    // Override it
    window.onunhandledrejection = function (event) {
      // Prevent the default handler from running
      event.preventDefault();
      // Now, we can handle it:
      console.log('🚨 Unhandled promise rejection', event.reason);
      response = { error: 'Error running user script\n' + event.reason };
    };

    response = await Promise.resolve(
      scriptFunction(context.globals, context.msg)
    ).catch((error) => {
      throw error;
    });

    // Restore the original handler
    window.onunhandledrejection = originalHandler;
  } catch (error) {
    console.log('🚨 Error running user script', error);
    return { error: 'Error running user script\n' + error };
  }
  return { response };
}

export function userFunction({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (typeof inputs?.userFunction === 'string') {
      runUserScript(inputs?.userFunction, { globals, msg }).then((result) => {
        if (result.error) {
          reject(result.error);
          return;
        } else if (typeof result.response !== 'object') {
          reject('userFunction must return an object');
          return;
        } else {
          resolve(result.response as Record<string, unknown>);
        }
      });
    } else {
      resolve({
        error: 'inputs.userFunction either doesnt exist or is not a string',
      });
    }
  });
}
