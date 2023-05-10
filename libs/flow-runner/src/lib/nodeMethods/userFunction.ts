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
      return `"${word}" is not allowed in user scripts`;
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
    console.log('💥 Error running userFunction', error);
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
  console.log('🧮 Running userFunction node');
  return new Promise((resolve, reject) => {
    if (!data.userFunction || typeof data.userFunction !== 'string') {
      reject(new Error('data.userFunction is not a string'));
    }
    try {
      runUserScript(data.userFunction as string, { msg, data }).then(
        (result) => {
          resolve({ ...msg, ...result });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
