// Require the websockets package
const WebSocket = require('ws');

// Create the WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for new connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Event listener for messages from the client
  ws.on('message', (message) => {
    console.log('Received: %s', message);

    // Send the message back to the client
    ws.send(`Server received: ${message}`);
  });

  // Send a message to the client upon successful connection
  ws.send('Welcome, client!');
});

console.log('WebSocket server is running on localhost:8080');
