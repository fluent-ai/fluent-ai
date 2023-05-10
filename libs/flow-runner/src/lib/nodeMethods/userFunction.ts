// Note : msg is not auto forwarded by user scripts.
// Note : The final resolve differs from the other patterns.

async function runUserScript(
  userScript: string,
  context: { msg: Record<string, unknown>; data: Record<string, unknown> }
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
  const scriptFunction = new Function('msg', 'data', userScript);
  let result;
  try {
    result = await scriptFunction(context.msg, context.data);
  } catch (error) {
    return { error: 'Error in user script\n' + error };
  }
  return result;
}

export interface UserFunctionData {
  userFunction: string;
  [key: string]: unknown;
}

export async function userFunction(
  msg: Record<string, unknown>,
  data: UserFunctionData
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (typeof data.userFunction === 'string') {
      runUserScript(data.userFunction, { msg, data }).then((result) => {
        resolve({ ...msg, ...result });
      });
    } else {
      reject('data.userFunction is not a string');
    }
  });
}
