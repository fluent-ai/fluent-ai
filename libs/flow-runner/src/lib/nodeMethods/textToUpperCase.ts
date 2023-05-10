export interface TextToUpperCaseMsg {
  payload: string;
  [key: string]: unknown;
}

export async function textToUpperCase(
  msg: TextToUpperCaseMsg
): Promise<Record<string, unknown>> {
  console.log('🧮 Running textToUpperCase node');
  return new Promise((resolve, reject) => {
    if (!msg.payload || typeof msg.payload !== 'string') {
      reject(new Error('msg.payload is not a string'));
    }
    resolve({ ...msg, payload: msg.payload.toUpperCase() });
  });
}
