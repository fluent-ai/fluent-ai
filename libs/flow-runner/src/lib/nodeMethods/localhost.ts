import { IMethodArguments } from '../useFlowRunner';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { v4 as uuidv4 } from 'uuid';
import { get as getNestedProperty } from 'lodash';

function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

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

export function remoterunner({
  globals,
  inputs,
  msg,
}: IMethodArguments): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    try {
      console.log('🔌 remoterunner called', { msg, inputs });
      const id = uuidv4();
      console.log(`call id is ${id}`);

      const send = (settings: Record<string, unknown>) => {
        console.log(`🔌 Sending`, { settings });
        client.send(
          JSON.stringify({
            id,
            settings,
            globals,
            msg,
          })
        );
      };

      if (client.readyState === client.OPEN) {
        switch (inputs?.callMode) {
          case 'call-bash': {
            let command = inputs?.bashFunction;
            if (inputs?.bashFunctionMode === 'bash-function-property') {
              command = getNestedProperty(
                { globals, msg },
                inputs?.bashFunctionPath as string
              );
            }
            if (command === undefined || command === null || command === '') {
              resolve({
                ...msg,
                error: `🔌🚨 invalid bashFunction, command is ${command}`,
              });
              return;
            }
            send({ callMode: 'call-bash', command });
            break;
          }
          case 'call-reference': {
            console.log(`🔌 call-reference`, { inputs });

            let reference = inputs?.referenceFunctionName;
            if (
              inputs?.referenceFunctionMode === 'reference-function-property'
            ) {
              reference = getNestedProperty(
                { globals, msg },
                inputs?.referenceFunctionPath as string
              );
            }
            if (
              reference === undefined ||
              reference === null ||
              reference === ''
            ) {
              resolve({
                ...msg,
                error: `🔌🚨 invalid referenceFunctionName, reference is ${reference}`,
              });
              return;
            }
            let args = inputs?.referenceArgs;
            if (inputs?.referenceArgsMode === 'reference-args-property') {
              args = getNestedProperty(
                { globals, msg },
                inputs?.referenceArgsPath as string
              );
            }
            if (args !== undefined) {
              // if (typeof args === 'object') {
              //   args = JSON.stringify(args);
              // }
              send({
                callMode: 'call-reference',
                reference,
                args,
              });
            } else {
              send({ callMode: 'call-reference', reference });
            }
            break;
          }
          case 'call-javascript': {
            let javascript = inputs?.javascript;
            if (inputs?.javascriptMode === 'javascript-property') {
              javascript = getNestedProperty(
                { globals, msg },
                inputs?.javascriptPath as string
              );
            }
            if (javascript === undefined || javascript === null) {
              resolve({
                ...msg,
                error: `🔌🚨 invalid javascript, javascript is\n${javascript}`,
              });
              return;
            }

            send({ callMode: 'call-javascript', javascript });
            break;
          }
          default:
            resolve({
              ...msg,
              error: `🔌🚨 invalid callMode`,
            });
            return;
        }
      }

      client.onmessage = (message) => {
        const data = JSON.parse(message.data as string);
        console.log('🔌 remoterunner received', { data });
        if (data.id === id) {
          if (data?.error) {
            reject(data.error);
          } else {
            resolve({
              ...msg,
              result: data.result,
            });
          }
        }
      };
    } catch (error) {
      resolve({
        ...msg,
        error: `remoterunner failed with error : ${error}`,
      });
    }
  });
}
