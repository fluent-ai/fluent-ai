// Require the websockets and child_process package
const fs = require('fs');
const WebSocket = require('ws');
const exec = require('child_process').exec;
const getNestedProperty = require('lodash/get');
const { Command } = require('commander');
const path = require('path');

// Command line setup
const program = new Command();
program
  .version('0.1.0')
  .option('-d, --dir <type>', 'Working directory')
  .parse(process.argv);
const cwd = program.opts()?.dir?.trim();

// Check if no arguments were provided
if (!cwd) {
  console.log('💥 Please explicitly specify a working directory using -d');
  process.exit(1);
} else {
  // Check if the specified directory exists
  if (!fs.existsSync(cwd)) {
    console.log(`💥 Directory ${cwd} does not exist`);
    process.exit(1);
  } else {
    console.log(`📦 Working directory is ${cwd}`);
  }
}

// Create the WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for new connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Event listener for messages from the client
  ws.on('message', async (message) => {
    console.log('\n🚧 New call received');
    const package = JSON.parse(message);
    console.log('📦 Received package : ', JSON.stringify(package, null, 2));
    const callMode = package?.settings?.callMode;
    console.log('🤙 Call mode:', callMode);
    const id = package?.id;
    console.log('🪪 id is :', id);

    const respondWithError = (error) => {
      console.warn('🚨 ', error);
      ws.send(JSON.stringify({ id, error }));
    };

    const respond = (result) => {
      console.log('✅ Done, sending result :\n', result);
      ws.send(JSON.stringify({ id, result }));
    };

    switch (callMode) {
      // ---------------------------------- CALL BASH ----------------------------------
      case 'call-bash': {
        const command = package?.settings?.command;
        console.log(`🚀 Calling bash command : ${command}`);
        exec(command, { cwd }, (error, stdout, stderr) => {
          if (error) {
            respondWithError(`🚨 Error executing bash function:\n ${error}`);
            return;
          }
          if (stderr) {
            respondWithError(`🚨 Error executing bash function:\n ${stderr}`);
            return;
          }
          if (stdout) {
            respond(stdout);
            return;
          }
          console.warn(`💀 No response! Resolving with empty result`);
          ws.send(JSON.stringify({ id, result: {} }));
        });
        break;
      }
      // ---------------------------------- CALL REFERENCE ----------------------------------
      case 'call-reference': {
        try {
          let funcName = package?.settings?.reference;
          if (!fs.existsSync(`./functions/${funcName}.js`)) {
            respondWithError(`🚨 ./functions/${funcName}.js not found`);
            return;
          }
          const func = require(`./functions/${funcName}.js`);
          if (func === undefined) {
            respondWithError(`🚨 Function imported ok but is undefined`);
            return;
          }
          let args = package?.settings?.args;

          if (args) {
            try {
              args = JSON.parse(args);
            } catch (error) {
              console.log(`🚧 Parsing args as JSON failed. Using them as is.`);
            }
            console.log(`🚀 Calling ${funcName} with args`);
            func(cwd, args).then(respond).catch(respondWithError);
          } else {
            console.log(`🚀 Calling ${funcName}`);
            func(cwd).then(respond).catch(respondWithError);
          }
        } catch (error) {
          respondWithError(`🚨 Error executing reference function: ${error}`);
        }
        break;
      }
      case 'call-javascript': {
        try {
          let javascript = package?.settings?.javascript;
          let javascriptFunction;
          try {
            javascriptFunction = new Function(
              'globals',
              'msg',
              `return (async function(){ ${javascript} })();`
            );
          } catch (error) {
            respondWithError(`🚨 Error parsing javascript function: ${error}`);
            return;
          }
          console.log(`🚀 Running javascript`);
          const result = await Promise.resolve(
            javascriptFunction(package?.globals, package?.msg)
          ).catch((error) => {
            respondWithError(
              `🚨 Error caught by promise wrapper in JavaScript function: ${error}`
            );
          });
          respond(result);
        } catch (error) {
          respondWithError(`🚨 Error executing JavaScript function: ${error}`);
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

console.log('WebSocket server is running on remoterunner:8080');
