import Mustache from 'mustache';

export interface TemplateProps {
  template: string;
  [key: string]: unknown;
}

export async function template(
  msg: Record<string, unknown>,
  props: TemplateProps
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (!props.template || typeof props.template !== 'string') {
      reject(new Error('props.template is not a string'));
    }
    try {
      resolve({
        ...msg,
        payload: Mustache.render(props.template as string, { msg, props }),
      });
    } catch (error) {
      reject(error);
    }
  });
}
