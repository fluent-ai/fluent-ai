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
    scriptFunction = new Function(
      'globals',
      'msg',
      `return (async function(){ ${userScript} })();`
    );
  } catch (error) {
    console.log('🚨 Error parsing user script', error);
    return { error: 'Error parsing user script\n' + error };
  }

  let result;

  try {
    // Save original handler
    const originalHandler = window.onunhandledrejection;

    // Override it
    window.onunhandledrejection = function (event) {
      // Prevent the default handler from running
      event.preventDefault();
      // Now, we can handle it:
      console.log('🚨 Unhandled promise rejection', event.reason);
      result = { error: 'Error running user script\n' + event.reason };
    };

    result = await Promise.resolve(
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
  return result;
}

export function userFunction({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    if (typeof inputs?.userFunction === 'string') {
      console.log('🌳', inputs?.userFunction);
      runUserScript(inputs?.userFunction, { globals, msg }).then((result) => {
        resolve({ ...msg, ...result });
      });
    } else {
      resolve({
        ...msg,
        error: 'inputs.userFunction either doesnt exist or is not a string',
      });
    }
  });
}
