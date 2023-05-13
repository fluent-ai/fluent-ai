import * as deepl from 'deepl-node';

interface Message {
  payload?: string;
  detectedLang?: string;
}

interface Props {
  language?: deepl.TargetLanguageCode;
  deeplAiApiKey: string;
}

export async function deeplAi(msg: Message, props: Props): Promise<Message> {
  const apiKey = props.deeplAiApiKey;
  const translator = new deepl.Translator(apiKey);
  return new Promise((resolve, reject) => {
    if (!msg.payload || typeof msg.payload !== 'string') {
      reject(new Error('msg.payload is not a string'));
    } else {
      console.log('👉 making a call with msg.payload:', msg.payload);

      translator
        .translateText(
          msg.payload,
          null,
          props.language ? props.language : 'en-GB'
        )
        .then((response) => {
          const result = response;
          console.log('👉response', result);

          resolve({
            ...msg,
            payload: result.text,
            detectedLang: result.detectedSourceLang,
          });
        })
        .catch((error: Error) => {
          console.log('👉', error);
          reject(error);
        });
    }
  });
}
