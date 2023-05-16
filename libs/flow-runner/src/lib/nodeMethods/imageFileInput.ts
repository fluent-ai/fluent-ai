import { IMethodArguments } from '../useFlowRunner';

export function imageFileInput({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    if (!inputs?.image || typeof inputs.image !== 'string') {
      resolve({
        ...msg,
        error: 'Image must exist and be encoded as a string',
      });
    }
    resolve({ ...msg, image: inputs?.image });
  });
}
