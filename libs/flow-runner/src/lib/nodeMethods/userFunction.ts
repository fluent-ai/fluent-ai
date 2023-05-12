// Note : msg is not auto forwarded by user scripts.
// Note : The final resolve differs from the other patterns.

async function runUserScript(
  userScript: string,
  context: { msg: Record<string, unknown>; props: Record<string, unknown> }
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
  const scriptFunction = new Function('msg', 'props', userScript);
  let result;
  try {
    result = await scriptFunction(context.msg, context.props);
  } catch (error) {
    return { error: 'Error in user script\n' + error };
  }
  return result;
}

export interface UserFunctionProps {
  userFunction: string;
  [key: string]: unknown;
}

export async function userFunction(
  msg: Record<string, unknown>,
  props: UserFunctionProps
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (typeof props.userFunction === 'string') {
      runUserScript(props.userFunction, { msg, props }).then((result) => {
        resolve({ ...msg, ...result });
      });
    } else {
      reject('props.userFunction is not a string');
    }
  });
}
