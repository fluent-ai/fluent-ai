import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});

// Handle socket connections
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle events from the client
  socket.on('message', (message: string) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('message', 'Hello Client!');
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
