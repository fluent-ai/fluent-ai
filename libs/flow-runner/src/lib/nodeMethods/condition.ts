import { IMethodArguments } from '../useFlowRunner';

interface IConditionInputs extends IMethodArguments {
  inputs: {
    location: string;
    query: string;
    operator: 'is' | 'is-not' | 'contains' | 'does-not-contain';
  };
}

// Helper function to get a deeply nested property from an object.
// If property does not exist, it will return undefined.
// Example: getNestedProperty(msg, ['payload', 'name']) would get msg.payload.name
function getNestedProperty(
  obj: Record<string, unknown>,
  propertyPath: string[]
): unknown {
  try {
    // propertyPath.slice(1);
    return propertyPath.reduce(
      (
        currentObject: Record<string, unknown> | unknown,
        currentProperty: string
      ) => {
        console.log('🚦 condition getNestedProperty reduce', {
          currentObject,
          currentProperty,
        });

        // If the current object is of type Record<string, unknown> and has the property, return it
        if (
          typeof currentObject === 'object' &&
          currentObject !== null &&
          currentProperty in currentObject
        ) {
          return (currentObject as Record<string, unknown>)[currentProperty];
        } else {
          // Property doesn't exist, throw an error
          throw new Error(`Property ${propertyPath.join('.')} doesn't exist`);
        }
      },
      obj as Record<string, unknown>
    );
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

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
          // ...msg,
          error: `location must exist and be a string`,
        });
      }
      if (!inputs?.query && typeof inputs?.query !== 'string') {
        resolve({
          // ...msg,
          error: `query must exist and be a string`,
        });
      }
      if (
        !inputs?.operator ||
        !['is', 'is-not', 'contains', 'does-not-contain'].includes(
          inputs?.operator as string
        )
      ) {
        resolve({
          // ...msg,
          error: `operator must exist and be one of the following :  'is' | 'is-not' | 'contains' | 'does-not-contain'`,
        });
      }

      console.log('🚦 condition inputs', { inputs });

      const pathArr = (inputs?.location as string)?.split('.');
      console.log('🚦 condition pathArr', { pathArr });
      // Use getNestedObject to find the target value at the given path in the message
      let targetValue;
      try {
        targetValue = getNestedProperty({ msg, globals }, pathArr);
      } catch (error) {
        resolve({
          // ...msg,
          error: `Failed to get nested property, ${error}`,
        });
      }

      // Store the query for easier access
      const query = inputs?.query;

      // Initialize a flag for whether the condition has been met
      let conditionMet = false;

      // Check the condition based on the operator given in the inputs
      switch (inputs?.operator) {
        // If the operator is 'is', the condition is met if the target value is equal to the query
        case 'is':
          conditionMet = targetValue === query;
          break;
        // If the operator is 'is-not', the condition is met if the target value is not equal to the query
        case 'is-not':
          conditionMet = targetValue !== query;
          break;
        // If the operator is 'contains', the condition is met if the target value contains the query
        case 'contains':
          if (targetValue && targetValue.toString().includes(query as string)) {
            conditionMet = true;
          }
          break;
        // If the operator is 'does-not-contain', the condition is met if the target value does not contain the query
        case 'does-not-contain':
          if (
            targetValue &&
            !targetValue.toString().includes(query as string)
          ) {
            conditionMet = true;
          }
          break;
        // If the operator is not recognized, throw an error
        default:
          resolve({
            // ...msg,
            error: `Invalid operator`,
          });
      }

      // If the condition is met, resolve the promise with the original message
      if (conditionMet) {
        resolve(msg);
      } else {
        // If the condition is not met, throw an error
        resolve({
          // ...msg,
          error: `Condition not met`,
        });
      }
    } catch (error) {
      resolve({
        // ...msg,
        error: `condition failed with error : ${error}`,
      });
    }
  });
}
