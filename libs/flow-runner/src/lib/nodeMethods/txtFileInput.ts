import { IMethodArguments } from '../useFlowRunner';

export function txtFileInput({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    console.log('🌈 txtFileInput', { globals, inputs, msg });

    if (!inputs?.input || typeof inputs.input !== 'string') {
      resolve({
        ...msg,
        error: 'Input must exist and be a string',
      });
    }
    resolve({ ...msg, payload: inputs?.input });
  });
}
