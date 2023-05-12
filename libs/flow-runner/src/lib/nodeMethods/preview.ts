export async function preview(
  msg: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    resolve(msg);
  });
}
