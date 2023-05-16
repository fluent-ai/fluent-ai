import styles from './socket-client.module.css';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

/* eslint-disable-next-line */
export interface SocketClientProps {
  userId: string;
}

export function SocketClient(props: SocketClientProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Replace with your server URL
    setSocket(socket);
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });
    socket.on('message', (data: any) => {
      console.log('Received message:', data);
    });

    socket.on('mouse', (data: any) => {
      console.log('Received message:', JSON.parse(data));
      const extract = JSON.parse(data);
      if (extract.userId !== props.userId) {
        setMousePos({ x: extract.x, y: extract.y });
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (socket) {
        socket.emit(
          'mouse',
          JSON.stringify({
            x: event.clientX,
            y: event.clientY,
            userId: props.userId,
          })
        );
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [socket, mousePos]);

  const sendMessage = () => {
    console.log(socket);
    if (socket) {
      socket.emit('message', 'Hello, server!');
    }
  };

  return (
    <div>
      <button className={styles.testButton} onClick={sendMessage}>
        Send Message
      </button>
      <div>
        The mouse is at position{' '}
        <b>
          ({mousePos.x}, {mousePos.y})
        </b>
      </div>
      <div
        style={{
          top: mousePos.y,
          left: mousePos.x,
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: 'orange',
          width: 10,
          height: 10,
        }}
      ></div>
    </div>
  );
}

export default SocketClient;
