import { Configuration, OpenAIApi } from 'openai';
import { IMethodArguments } from '../useFlowRunner';

export function dalleGeneration({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
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
          n: 1,
          size: '256x256',
        })
        .then((response) => {
          // console.log('🤙 openAI response', response.data.data[0]);
          resolve({
            ...msg,
            image: response?.data?.data[0],
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
//     openAiApiKey: ///please add the key to the api ,
//   },
//   msg: { payload: 'a white siamese cat	' },
//   inputs: '',
// };
// // @ts-expect-error no custom types for one line

// console.log(imageCreationAi(message));
// console.log('--------------------------------');
// setTimeout(() => {
//   console.log(message);
// }, 1000);