import { supabase } from '@tool-ai/supabase';
import { IMethodArguments } from '../useFlowRunner';

export function openAi({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  async function query(params = {}) {
    const { data } = await supabase.getClient().functions.invoke('open-ai', {
      body: JSON.stringify({ params }),
    });
    console.log('💰', { data });
    return data?.content;
  }

  return new Promise((resolve) => {
    if (
      !msg.payload ||
      (typeof msg.payload !== 'string' && typeof msg.payload !== 'object')
    ) {
      resolve({
        ...msg,
        error: `msg.payload either doesnt exist or is neither a string nor object`,
      });
    }
    try {
      console.log('🤙 openAI msg', msg);
      let params = undefined;
      if (typeof msg.payload === 'string') {
        console.log('🤙 openAI msg.payload is string');
        params = { messages: [{ role: 'user', content: msg.payload }] };
      } else {
        console.log('🤙 openAI msg.payload is object');
        params = msg.payload as Record<string, unknown>;
      }

      query(params)
        .then((response) => {
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
