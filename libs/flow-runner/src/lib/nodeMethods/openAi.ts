import { supabase } from '@tool-ai/supabase';
import { IMethodArguments } from '../useFlowRunner';
import { reject } from 'lodash';

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
    try {
      console.log('🤙 openAI msg', msg);
      let params = undefined;

      if (msg.openAi && typeof msg.openAi === 'object') {
        console.log('🤙 openAI msg.openAi is object');
        params = msg.openAi as Record<string, unknown>;
      } else if (msg.payload && typeof msg.payload === 'string') {
        console.log('🤙 openAI msg.openAi is NOT object');
        params = { messages: [{ role: 'user', content: msg.payload }] };
      } else {
        reject({
          error: `openAi node needs either a string on msg.payload or an object on msg.openAi`,
        });
      }
      console.log('🤙 openAI params', params);
      query(params)
        .then((response) => {
          if (inputs?.mode === 'conversation') {
            console.log('🤙 openAI is in conversation mode 🎙️');
            let conversation: IConversation = { messages: [] };
            if (msg.openAi && typeof msg.openAi === 'object') {
              conversation = msg.openAi as IConversation;
            }
            conversation.messages.push(response.raw.choices[0].message);

            resolve({
              ...msg,
              finish_reason: response.raw.choices[0].finish_reason,
              usage: response.raw.usage,
              openAi: conversation,
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
