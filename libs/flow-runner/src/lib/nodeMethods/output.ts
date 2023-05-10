export async function output(
  msg: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    console.log({ msg });
    resolve(msg);
  });
}
