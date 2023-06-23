import { supabase } from '@tool-ai/supabase';
import { IMethodArguments } from '../useFlowRunner';

export function openAi({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  async function query(args = {}) {
    const { data } = await supabase.getClient().functions.invoke('open-ai', {
      body: JSON.stringify({ name: 'fluentAI', params: args }),
    });
    console.log('💰', { data });

    // const { data, error } = await supabase
    //   .getClient()
    //   .functions.invoke('set-credit', { body: JSON.stringify(args) });

    // if (data?.error) {
    //   throw new Error(data?.error);
    // }

    // console.log('🤙 openAI data', data);

    // return data.content;
    return data.content;
  }

  return new Promise((resolve) => {
    if (!msg.payload || typeof msg.payload !== 'string') {
      resolve({
        ...msg,
        error: `msg.payload either doesnt exist or is not a string`,
      });
    }
    try {
      console.log('🤙 openAI msg', msg);

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
