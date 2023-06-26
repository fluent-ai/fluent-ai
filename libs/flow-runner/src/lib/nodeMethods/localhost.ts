import { IMethodArguments } from '../useFlowRunner';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8080');

client.onopen = () => {
  console.log('🔌 WebSocket Client Connected');
};

client.onmessage = (message) => {
  console.log("🔌 Received: '" + message.data + "'");
};

export function localhost({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    try {
      console.log('🔌 localhost called', { msg });

      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(msg));
      }

      client.onmessage = (message) => {
        resolve({
          ...msg,
          payload: message.data,
        });
      };
    } catch (error) {
      resolve({
        ...msg,
        error: `localhost failed with error : ${error}`,
      });
    }
  });
}
