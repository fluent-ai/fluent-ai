import styles from './socket-client.module.css';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { store } from '@tool-ai/state';
import { useSelector } from 'react-redux';
import { access } from 'fs';

/* eslint-disable-next-line */
export interface SocketClientProps {
  userId: string;
  userName: string;
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

    socket.on('mouse', (data: any) => {
      const extract = JSON.parse(data);
      const activeTabId = store.getState().flowTab.flowTabs.activeId;

      if (extract.userId !== props.userId && extract.tabId === activeTabId) {
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
        const activeTabId = store.getState().flowTab.flowTabs.activeId;
        socket.emit(
          'mouse',
          JSON.stringify({
            x: event.clientX,
            y: event.clientY,
            userId: props.userId,
            tabId: activeTabId,
          })
        );
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [socket, mousePos, props.userId]);

  return (
    <div>
      <div
        style={{
          top: mousePos.y,
          left: mousePos.x,
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: 'orange',
          width: 7,
          height: 7,
          borderRadius: 10,
        }}
      ></div>
      <span
        style={{
          top: mousePos.y + 7,
          left: mousePos.x + 7,
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: 'orange',
          padding: 3,
          borderRadius: 10,
          fontSize: '0.7rem',
          overflow: 'hidden',
        }}
      >
        {props.userName}
      </span>
    </div>
  );
}

export default SocketClient;
