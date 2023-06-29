import { IMethodArguments } from '../useFlowRunner';
import { get as getNestedProperty } from 'lodash';

export function condition({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    try {
      console.log('🚦 condition called', { msg });
      if (!inputs?.location && typeof inputs?.location !== 'string') {
        resolve({
          error: `location must exist and be a string`,
        });
        return;
      }
      if (!inputs?.query && typeof inputs?.query !== 'string') {
        resolve({
          error: `query must exist and be a string`,
        });
        return;
      }
      if (
        !inputs?.operator ||
        ![
          'is',
          'is-not',
          'contains',
          'does-not-contain',
          'starts-with',
          'ends-with',
        ].includes(inputs?.operator as string)
      ) {
        resolve({
          error: `operator must exist and be one of the following :  'is' | 'is-not' | 'contains' | 'does-not-contain'`,
        });
        return;
      }

      console.log('🚦 condition inputs', { inputs });

      const pathArr = (inputs?.location as string)?.split('.');
      console.log('🚦 condition pathArr', { pathArr });
      let targetValue;
      try {
        targetValue = getNestedProperty({ msg, globals }, pathArr);
      } catch (error) {
        resolve({
          error: `Failed to get nested property, ${error}`,
        });
        return;
      }
      const query = inputs?.query;
      let conditionMet = false;
      switch (inputs?.operator) {
        case 'is':
          conditionMet = targetValue === query;
          break;
        case 'is-not':
          conditionMet = targetValue !== query;
          break;
        case 'contains':
          if (targetValue && targetValue.toString().includes(query as string)) {
            conditionMet = true;
          }
          break;
        case 'does-not-contain':
          if (
            targetValue &&
            !targetValue.toString().includes(query as string)
          ) {
            conditionMet = true;
          }
          break;
        case 'starts-with':
          if (
            targetValue &&
            targetValue.toString().startsWith(query as string)
          ) {
            conditionMet = true;
          }
          break;
        case 'ends-with':
          if (targetValue && targetValue.toString().endsWith(query as string)) {
            conditionMet = true;
          }
          break;
        default:
          resolve({
            error: `Invalid operator`,
          });
          return;
      }

      if (conditionMet) {
        resolve(msg);
      } else {
        resolve({
          error: `Condition not met`,
        });
        return;
      }
    } catch (error) {
      resolve({
        error: `condition failed with error : ${error}`,
      });
      return;
    }
  });
}
