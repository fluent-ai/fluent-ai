import { IMethodArguments } from '../useFlowRunner';

export function condition({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    try {
      console.log('🚦 condition called', { msg });
    } catch (error) {
      resolve({
        ...msg,
        error: `localhost failed with error : ${error}`,
      });
    }
  });
}
