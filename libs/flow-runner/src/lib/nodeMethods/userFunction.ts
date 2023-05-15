import { IMethodArguments } from '../useFlowRunner';

async function runUserScript(
  userScript: string,
  context: Record<string, unknown>
) {
  // Check for disallowed words
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

  // Prepend Use strict mode
  userScript = '"use strict";\n' + userScript;

  // Remove comments
  userScript = userScript.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');

  // Execute the sanitized code in a sandboxed context
  const scriptFunction = new Function('globals', 'msg', userScript);
  let result;
  try {
    result = await scriptFunction(context.globals, context.msg);
  } catch (error) {
    return { error: 'Error in user script\n' + error };
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
