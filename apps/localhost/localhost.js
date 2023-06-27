// Require the websockets and child_process package
const WebSocket = require('ws');
const exec = require('child_process').exec;
const getNestedProperty = require('lodash/get');

// Create the WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for new connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Event listener for messages from the client
  ws.on('message', (message) => {
    console.log('\n🚧 New call received');

    const msg = JSON.parse(message);

    console.log('Received:', JSON.stringify(msg, null, 2));

    const callMode = msg?.inputs?.callMode;

    console.log('🤙 Call mode:', callMode);

    // const { inputs, callMode, functionSource } = msg.inputs;

    // Execute the function based on the call type and function source
    switch (callMode) {
      case 'call-bash': {
        let command = msg?.inputs?.bashFunction;
        if (msg?.inputs?.bashFunctionMode === 'bash-function-property') {
          console.log(
            `🔎 Getting bash function from property ${msg?.inputs?.bashFunctionPath}`
          );
          command = getNestedProperty(msg, msg?.inputs?.bashFunctionPath);
        }
        console.log(`🚀 Calling ${command}`);
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.warn(`🚨 Error executing bash function: ${error}`, error);
            return;
          }
          ws.send(stdout ? stdout : stderr);
        });
        break;
      }
      case 'call-reference': {
        // console.log('💀 Calling by reference not yet implemented');
        try {
          const func = require(`./functions/${msg?.inputs?.functionName}.js`);
          const result = func();
          ws.send(JSON.stringify(result));
        } catch (error) {
          console.warn(
            `🚨 Error executing reference function: ${error}`,
            error
          );
        }
        break;
      }
      case 'call-javascript': {
        try {
          const func =
            functionSource === 'direct'
              ? inputs.function
              : msg[inputs.functionPath];
          const result = eval(func);
          ws.send(JSON.stringify(result));
        } catch (error) {
          console.warn(
            `🚨 Error executing JavaScript function: ${error}`,
            error
          );
        }
        break;
      }
      default: {
        console.warn(`🚨 Unrecognized call mode: ${callMode}`);
        break;
      }
    }
  });

  // Send a message to the client upon successful connection
  ws.send('Welcome, client!');
});

console.log('WebSocket server is running on localhost:8080');
