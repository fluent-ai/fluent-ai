import { useEffect, useRef, useState, useCallback } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

interface WebSocketError extends Error {
  code?: number;
  reason?: string;
  target?: W3CWebSocket;
  type?: string;
}

export interface UseRemoteRunnerProps {
  host?: string;
  port?: number;
  initialReconnectDelay?: number;
  maxReconnectDelay?: number;
  retryLimit?: number;
}

export interface ConnectionState {
  status: "connected" | "disconnected" | "error";
  error: WebSocketError | null;
}

export const useRemoteRunner = ({
  host = '127.0.0.1',
  port = 8080,
  initialReconnectDelay = 1000,
  maxReconnectDelay = 5000,
  retryLimit = Infinity
}: UseRemoteRunnerProps = {}) => {
  const url = `ws://${host}:${port}`;
  const [enabled, setEnabled] = useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>({status: "disconnected", error: null});
  const [reconnectDelay, setReconnectDelay] = useState(initialReconnectDelay);
  const [retryCount, setRetryCount] = useState(0);
  const client = useRef<W3CWebSocket | null>(null);

  const connect = useCallback(() => {
    setConnectionState({status: "disconnected", error: null});
    client.current = new W3CWebSocket(url);

    client.current.onopen = () => {
      setConnectionState({status: "connected", error: null});
      setRetryCount(0);
      console.log('🔌 WebSocket Client Connected');
    };

    client.current.onclose = () => {
      setConnectionState({status: "disconnected", error: null});
      if (retryCount < retryLimit) {
        console.log('🔌 WebSocket Connection Closed. Reconnecting...');
        setTimeout(connect, reconnectDelay);
        setReconnectDelay(Math.min(maxReconnectDelay, reconnectDelay + initialReconnectDelay));
        setRetryCount(retryCount + 1);
        console.log(`🔌 Reconnect in ${reconnectDelay / 1000}s`);
      } else {
        console.log('🔌 Retry Limit Reached. Not Reconnecting');
      }
    };

    client.current.onerror = (error: WebSocketError) => {
      setConnectionState({status: "error", error});
      console.log('🔌 WebSocket Error: ', error);
    };
  }, [url, reconnectDelay, initialReconnectDelay, maxReconnectDelay, retryCount, retryLimit]);

  const disconnect = useCallback(() => {
    if (client.current) {
      client.current.close();
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return disconnect;
  }, [enabled, connect, disconnect]);

  return {
    client, 
    connect,
    disconnect,
    setEnabled,
    enabled,
    connectionState,
    retryCount
  } 
}

export default useRemoteRunner;
