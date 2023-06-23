import Mustache from 'mustache';

import { IMethodArguments } from '../useFlowRunner';

export function template({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (!inputs?.template || typeof inputs.template !== 'string') {
      resolve({
        ...msg,
        error: `inputs.template either doesnt exist or is not a string`,
      });
    }
    try {
      resolve({
        ...msg,
        payload: Mustache.render(inputs?.template as string, {
          globals,
          inputs,
          msg,
        }),
      });
    } catch (error) {
      resolve({
        ...msg,
        error: `Mustache template failed with error : ${error}`,
      });
    }
  });
}
