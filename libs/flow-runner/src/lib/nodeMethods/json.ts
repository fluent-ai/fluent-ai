export interface JsonMsg {
  payload: string;
  [key: string]: unknown;
}

export async function json(msg: JsonMsg): Promise<Record<string, unknown>> {
  console.log('🧮 Running json node');
  return new Promise((resolve, reject) => {
    //try parse the msg.payload as json
    try {
      resolve({ ...msg, payload: JSON.parse(msg.payload as string) });
    } catch (error) {
      //if it fails, try convert it to a string
      try {
        resolve({ ...msg, payload: JSON.stringify(msg.payload) });
      } catch (error) {
        reject(error);
      }
    }
  });
}
