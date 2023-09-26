// Defining openAi function
export async function openAi(params = {}) {
  const DEFAULT_PARAMS = {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 1024,
    // top_p: 1,
    temperature: 1.5,
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
      Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
    },
    body: JSON.stringify(params_),
  };

  const response = await fetch(
    'https://api.openai.com/v1/chat/completions',
    requestOptions
  );

  const data = await response.json();

  return data;
}
