import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IMethodArguments } from '../useFlowRunner';

// Define the API endpoint
const DEEPL_API_ENDPOINT = 'https://api-free.deepl.com/v2/translate';



export async function deeplAi({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  const authKey = globals?.deeplApiKey as string || '';
  const sourceText = msg.payload as string || '';
  const targetLang = inputs?.language as string || 'en-GB';
  const formality = inputs?.formality as string || 'default';

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
    data: new URLSearchParams(data).toString(),
  };

  // Make the request
  return new Promise((resolve) => {
    axios(config)
      .then((response: AxiosResponse) => {
        resolve({
          ...msg,
          payload: response.data.translations[0].text,
          detectedLang: response.data.translations[0].detected_source_language,
        });
      })
      .catch((error: AxiosError) => {
        console.error(error);
        resolve({
          ...msg, error:'DeepL API error : ' + error.message
        });
      });
  });
}
