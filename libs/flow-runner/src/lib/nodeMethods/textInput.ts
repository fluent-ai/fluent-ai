export interface inputProps {
  input: string;
  [key: string]: unknown;
}

export async function textInput(
  msg: Record<string, unknown>,
  props: inputProps
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (!props.input || typeof props.input !== 'string') {
      reject(new Error('props.input is not a string'));
    }
    resolve({ ...msg, payload: props.input });
  });
}
