import { Configuration, OpenAIApi } from 'openai';
import { IMethodArguments } from '../useFlowRunner';

export function dalleGeneration({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  console.log('🤙 dalleGeneration', globals, inputs, msg);
  // @ts-expect-error no custom types for one line
  const number = inputs.numberVariations || 1;

  // console.log('🤙  inputs.number', number);
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

      // console.log(number);
      openai
        .createImage({
          // @ts-expect-error no custom types for one line
          prompt: msg.payload,
          // @ts-expect-error no custom types for one line
          n: number as string,
          size: '256x256',
        })
        .then((response) => {
          console.log('🤙 openAI response', response.data);
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
