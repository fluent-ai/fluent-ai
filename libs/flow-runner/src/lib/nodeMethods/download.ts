import { IMethodArguments } from '../useFlowRunner';

export function download({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    resolve(msg);
  });
}
