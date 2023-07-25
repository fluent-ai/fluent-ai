import { IMethodArguments } from '../useFlowRunner';

type PathMode = 'simple' | 'custom';
interface IInputs {
  input?: string;
  pathMode?: PathMode;
  path?: string;
}
export function textInput({
  globals,
  inputs,
  msg,
}: IMethodArguments<IInputs>): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    console.log('📝 textInput called', {
      globals,
      inputs,
      msg,
    });

    const { input, pathMode, path } = inputs ?? {};

    // Check for valid input
    if (!input || typeof input !== 'string') {
      resolve({
        ...msg,
        error: 'Input must exist and be a string',
      });
      return;
    }

    // For 'path' mode
    if (pathMode === 'custom') {
      console.log('📝 textInput custom mode called');

      // Check for valid path
      if (!path || typeof path !== 'string') {
        resolve({
          ...msg,
          error: 'In path mode, path must exist and be a string',
        });
        return;
      }

      // Split path into root and properties
      const [root, ...propPath] = path.split('.');

      // Check for valid root
      if (!(root === 'globals' || root === 'msg')) {
        console.warn(
          '🚨 Invalid root in path. Root must be either "msg" or "globals".',
          path
        );
        resolve(msg);
        return;
      }

      // Choose the root object
      const rootObject = root === 'globals' ? globals : msg;

      // Check if root object is defined
      if (!rootObject) {
        console.warn('🚨 Root object is not defined.', root);
        resolve(msg);
        return;
      }

      // Set the value at the path, creating any necessary objects along the way
      propPath.reduce(
        (obj: Record<string, unknown>, prop: string, i: number) => {
          if (i === propPath.length - 1) {
            obj[prop] = input;
          } else {
            obj[prop] = obj[prop] || {};
          }
          return obj[prop] as Record<string, unknown>;
        },
        rootObject
      );

      resolve({ ...msg });
    }
    // For 'payload' mode or any other mode
    else {
      resolve({ ...msg, payload: input });
    }
  });
}
