import { supabase } from '@tool-ai/supabase';
import { IMethodArguments } from '../useFlowRunner';

interface IConversation {
  messages: Record<string, unknown>[];
}

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
    return data;
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
          //if input.mode is 'conversation', append the last message message property
          if (inputs?.mode === 'conversation') {
            console.log('🤙 openAI is in conversation mode 🎙️');
            let conversation: IConversation = { messages: [] };
            if (msg.payload && typeof msg.payload === 'object') {
              conversation = msg.payload as IConversation;
            }
            conversation.messages.push(response.raw.choices[0].message);

            resolve({
              ...msg,
              finish_reason: response.raw.choices[0].finish_reason,
              usage: response.raw.usage,
              payload: conversation,
            });
          } else {
            console.log('🤙 openAI is in simple mode 🤪');
            resolve({
              ...msg,
              payload: response.content,
            });
          }
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
