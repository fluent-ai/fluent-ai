import * as deepl from 'deepl';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define the API endpoint
const DEEPL_API_ENDPOINT = 'https://api-free.deepl.com/v2/translate';

interface Message {
  payload?: string;
  detectedLang?: string;
}

interface Props {
  language?: deepl.DeeplLanguages;
  deeplAiApiKey?: string;
  formality?: deepl.Parameters;
}

export async function deeplAi(msg: Message, props: Props): Promise<Message> {
  // Define your parameters
  const authKey = 'b5bdd36a-0c1b-0418-58fb-9b043d819dea:fx'; // Replace with your DeepL authentication key
  const sourceText = msg.payload || '';
  const targetLang = props.language ? props.language : 'en-GB'; // Replace with the ISO 639-1 code for the target language (e.g. 'ES' for Spanish)

  const data = {
    auth_key: authKey,
    text: sourceText,
    target_lang: targetLang,
  };

  const config: AxiosRequestConfig = {
    method: 'POST',
    url: DEEPL_API_ENDPOINT,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams(data).toString(), // Convert the data object to a URL-encoded string
  };

  // Make the request
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response: AxiosResponse) => {
        resolve({
          ...msg,
          payload: response.data.translations[0].text,
          detectedLang: response.data.translations[0].detected_source_language,
        });
      })
      .catch((error: AxiosError) => {
        console.error(error); // Log any errors
      });
  });
}
//just for testing purposes
// const message = {
//   payload: 'wie geht es dir ?',
//   formality: 'more',
// };
// const props = {
//   // deeplAiApiKey: 'test',
//   // formality: 'default',
// };
// console.log(
//   '----------------------------------------------------------------------------------------------------------------'
// );
// const result = deeplAi(message, props);
// setTimeout(() => {
//   console.log(result);
// }, 1000);
