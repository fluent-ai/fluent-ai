import { IMethodArguments } from '../useFlowRunner';

export function json({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    if (!msg.payload) {
      resolve({
        ...msg,
        error: 'JSON node expects msg object to include a payload',
      });
    }
    //try parse the msg.payload as json
    try {
      resolve({ ...msg, payload: JSON.parse(msg.payload as string) });
    } catch (error) {
      //if it fails, try convert it to a string
      resolve({ ...msg, payload: JSON.stringify(msg.payload) });
    }
  });
}
