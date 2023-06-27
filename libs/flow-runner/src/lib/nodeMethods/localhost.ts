import { IMethodArguments } from '../useFlowRunner';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

let client: W3CWebSocket;
let reconnectTime = 1000;

const connect = () => {
  client = new W3CWebSocket('ws://127.0.0.1:8080');

  client.onopen = () => {
    console.log('🔌 WebSocket Client Connected');
  };

  client.onclose = () => {
    console.log('🔌 WebSocket Connection Closed. Reconnecting...');
    setTimeout(connect, reconnectTime);
    reconnectTime = Math.min(5000, reconnectTime + 1000);
    console.log(`🔌 Reconnect in ${reconnectTime / 1000}s`);
  };

  client.onerror = (error) => {
    console.log('🔌 WebSocket Error: ', error);
  };
};

connect();

export function localhost({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    try {
      console.log('🔌 localhost called', { msg, inputs });

      if (client.readyState === client.OPEN) {
        // including information about call type and function source in the sent message
        client.send(
          JSON.stringify({
            inputs,
            msg,
          })
        );
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
