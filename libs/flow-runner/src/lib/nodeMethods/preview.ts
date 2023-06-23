import { IMethodArguments } from '../useFlowRunner';

export function preview({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    resolve(msg);
  });
}
