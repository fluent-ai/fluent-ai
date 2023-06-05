import React, { useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  OnNodesChange,
  OnEdgesChange,
  OnInit,
  Connection
} from 'reactflow';
import {
  NodeDialogComponent,
} from '@tool-ai/ui';
import Context from '../../context/context';

interface FlowProps {
  reactFlowWrapper: React.MutableRefObject<any>;
  nodes: Node<{ label: string }, string | undefined>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setNodes: React.Dispatch<React.SetStateAction<Node<string | undefined>[]>>;
  onConnect: (params: Connection) => void;
  onInit: OnInit;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  nodeTypes: any;
}

const Flow = (props: FlowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState('');
  const [activeNodeId, setActiveNodeId] = useState('');


  return (

  );
};

export default Flow;
