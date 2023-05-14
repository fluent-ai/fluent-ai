import { Configuration, OpenAIApi } from 'openai';
import { IMethodArguments } from '../useFlowRunner';

export function openAi({
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
      // console.log(`🤙 Making call to openAI with key ${globals?.openAiApiKey}`);
      openai
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          // @ts-expect-error no custom types for one line
          messages: [{ role: 'user', content: msg.payload }],
        })
        .then((response) => {
          // console.log('🤙 openAI response', response);
          resolve({
            ...msg,
            payload: response.data.choices[0].message?.content,
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
