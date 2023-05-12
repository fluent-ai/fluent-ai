import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function openAi(
  msg: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (!msg.payload || typeof msg.payload !== 'string') {
      reject(new Error('msg.payload is not a string'));
    }
    // try {
    console.log('👉 making a call with msg.payload:', msg.payload);
    openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        // @ts-expect-error no custom types for one line
        messages: [{ role: 'user', content: msg.payload }],
      })
      .then((response) => {
        console.log('👉', response.data.choices[0].message?.content);

        resolve({
          ...msg,
          payload: response.data.choices[0].message?.content,
        });
      });
    // } catch (error) {
    //   reject(error);
    // }
  });
}
