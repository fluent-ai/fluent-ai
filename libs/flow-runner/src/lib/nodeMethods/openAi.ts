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
    return data;
  }

  return new Promise((resolve) => {
    try {
      let params = undefined;

      if (msg.openAi && typeof msg.openAi === 'object') {
        params = msg.openAi as Record<string, unknown>;
      } else if (msg.payload && typeof msg.payload === 'string') {
        params = { messages: [{ role: 'user', content: msg.payload }] };
      } else {
        reject({
          error: `openAi node needs either a string on msg.payload or an object on msg.openAi`,
        });
      }
      query(params)
        .then((response) => {
          if (inputs?.mode === 'conversation') {
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
            resolve({
              ...msg,
              payload: response.content,
            });
          }
        })
        .catch((error) => {
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
