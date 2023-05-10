export interface JsonMsg {
  payload: string | Record<string, unknown>;
  [key: string]: unknown;
}

export async function json(msg: JsonMsg): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    //try parse the msg.payload as json
    try {
      resolve({ ...msg, payload: JSON.parse(msg.payload as string) });
    } catch (error) {
      //if it fails, try convert it to a string
      resolve({ ...msg, payload: JSON.stringify(msg.payload) });
    }
  });
}
