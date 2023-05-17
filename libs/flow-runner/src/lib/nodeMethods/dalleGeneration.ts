import { Configuration, OpenAIApi } from 'openai';
import { IMethodArguments } from '../useFlowRunner';

export function dalleGeneration({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  // @ts-expect-error no custom types for one line

  const number = (inputs.numberVariations as number) || 1;
  return new Promise((resolve) => {
    if (!msg.payload || typeof msg.payload !== 'string') {
      resolve({
        ...msg,
        error: `msg.payload either doesnt exist or is not a string`,
      });
    }
    try {
      const configuration = new Configuration({
        apiKey: globals?.openAiApiKey as string,
      });

      const openai = new OpenAIApi(configuration);
      console.log(
        `🤙 Making call to openAI with configuration ${JSON.stringify(
          configuration
        )}`
      );
      openai
        .createImage({
          // @ts-expect-error no custom types for one line
          prompt: msg.payload,
          n: number,
          size: '256x256',
        })
        .then((response) => {
          console.log('🤙 openAI response', response.data.data);
          resolve({
            ...msg,
            images: response?.data?.data,
          });
        });
    } catch (error) {
      resolve({
        ...msg,
        error: `openAi failed with error : ${error}`,
      });
    }
  });
}

// // for testing purposes
// const message = {
//   globals: {
//     openAiApiKey: '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',
//   },
//   msg: { payload: 'a white siamese cat	' },
//   inputs: {
//     numberVariations: 2,
//   },
// };

// console.log(dalleGeneration(message));
// console.log('--------------------------------');
// setTimeout(() => {
//   console.log('message', message);
// }, 2000);
