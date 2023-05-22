import { Configuration, OpenAIApi } from 'openai';
import { IMethodArguments } from '../useFlowRunner';

const DEFAULT_PARAMS = {
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  // messages: [
  //   {
  //     role: 'user',
  //     content: 'Hello, how are you?',
  //   },
  // ],
};

export function openAi({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  async function query(params = {}) {
    const params_ = { ...DEFAULT_PARAMS, ...params };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(globals?.openAiApiKey as string),
      },
      body: JSON.stringify(params_),
    };
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      requestOptions
    );
    const data = await response.json();
    console.log('🤙 raw response', data);
    return data.choices[0].message?.content;
  }

  return new Promise((resolve) => {
    if (!msg.payload || typeof msg.payload !== 'string') {
      resolve({
        ...msg,
        error: `msg.payload either doesnt exist or is not a string`,
      });
    }
    try {
      // const configuration = new Configuration({
      //   apiKey: globals?.openAiApiKey as string,
      // });
      // delete configuration.baseOptions.headers['User-Agent'];

      // console.log(`🤙 configuration`, { configuration });
      // const openai = new OpenAIApi(configuration);

      // console.log(`🤙 Making call to openAI with ${{ globals, inputs, msg }}`);
      // openai
      //   .createChatCompletion({
      //     model: 'gpt-3.5-turbo',
      //     // @ts-expect-error no custom types for one line
      //     messages: [{ role: 'user', content: msg.payload }],
      //   })
      //   .then((response) => {
      //     console.log('🤙 openAI response', response);
      //     resolve({
      //       ...msg,
      //       payload: response.data.choices[0].message?.content,
      //     });
      //   })
      //   .catch((error) => {
      //     console.log('🤙 openAI error', error);
      //     resolve({
      //       ...msg,
      //       error: `openAi failed with error : ${error}`,
      //     });
      //   });
      query({ messages: [{ role: 'user', content: msg.payload }] })
        .then((response) => {
          console.log('🤙 openAI response', response);
          resolve({
            ...msg,
            payload: response,
          });
        })
        .catch((error) => {
          console.log('🤙 openAI error', error);
          resolve({
            ...msg,
            error: `openAi failed with error : ${error}`,
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
