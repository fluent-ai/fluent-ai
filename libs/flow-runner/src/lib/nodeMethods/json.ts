import { IMethodArguments } from '../useFlowRunner';
import { get as getNestedProperty, set as setNestedProperty } from 'lodash';

export function json({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    const inputMode = inputs?.inputMode as string;
    const inputPath = (inputs?.inputPath as string) || 'msg.payload';
    let input;
    if (inputMode === 'custom') {
      try {
        input = getNestedProperty({ msg, globals }, inputPath);
      } catch (error) {
        resolve({
          error: `Failed to get nested property for input, ${error}`,
        });
        return;
      }
    }

    let output;
    try {
      output = JSON.parse(input as string);
    } catch (error) {
      output = JSON.stringify(input);
    }

    const outputPath = (inputs?.outputPath as string) || 'msg.payload';

    output = setNestedProperty({ msg }, outputPath, output).msg;
    resolve({ ...output });
  });
}
