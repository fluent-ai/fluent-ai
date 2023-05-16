import styles from './socket-client.module.css';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

/* eslint-disable-next-line */
export interface SocketClientProps {}

export function SocketClient(props: SocketClientProps) {
  // const [socket, setSocket] = useState<Socket | null>(null);
  const socket = io('http://localhost:3000'); // Replace with your server URL

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
      console.log(socket);
    });

    socket.on('message', (data: any) => {
      console.log('Received message:', data);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = () => {
    if (socket) {
      socket.emit('message', 'Hello, server!');
    }
  };

  return (
    <div>
      <button className={styles.testButton} onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
}

export default SocketClient;
