import { supabase } from '@tool-ai/supabase';
import { IMethodArguments } from '../useFlowRunner';

interface IConversation {
  messages: Record<string, unknown>[];
}

export function openAi({
  globals,
  inputs,
  msg,
  context,
}: IMethodArguments): Promise<Record<string, unknown>> {
  async function querySupabase(params = {}) {
    const { data } = await supabase.getClient().functions.invoke('open-ai', {
      body: JSON.stringify({ params }),
    });
    return data;
  }

  async function queryDirect(params = {}) {
    console.log(`🙋‍♀️ Making direct query with params`, params);
    const DEFAULT_PARAMS = {
      model: 'gpt-3.5-turbo',
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const params_ = {
      ...DEFAULT_PARAMS,
      ...params,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context?.openAi?.key}`,
      },
      body: JSON.stringify(params_),
    };
    console.log(`🙋‍♀️ API Key`, context?.openAi?.key);
    try {
      console.log(
        `🙋‍♀️ calling fetch with`,
        JSON.stringify(requestOptions, null, 2)
      );
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        requestOptions
      );

      const data = await response.json();
      console.log(`🙋‍♀️ response`, { data });

      return data;
    } catch (error) {
      console.log('🙋‍♀️ error', error);
      throw new Error(error as unknown as string);
    }
  }

  const query = context?.openAi?.useOwnKey ? queryDirect : querySupabase;

  return new Promise((resolve, reject) => {
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
            conversation.messages.push(response.choices[0].message);

            resolve({
              ...msg,
              finish_reason: response.choices[0].finish_reason,
              usage: response.usage,
              openAi: conversation,
            });
          } else {
            resolve({
              ...msg,
              payload: response.choices[0].message.content,
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
