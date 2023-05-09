// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { SignIn } from '@libs/auth';
import { SignUp } from '@libs/auth';
import { AuthDetails } from '@libs/auth';
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  Controls,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeSideBar from '../components/Navigation/NodeSideBar/NodeSideBar';
import FlowTabs from '../components/Navigation/FlowTabs/FlowTabs';
import TemplateNode from '../components/Nodes/TemplateNode/TemplateNode';

import './app.module.css';
import Header from '../components/Navigation/Header/Header';

const nodeTypes = {
  templateNode: TemplateNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    type: 'templateNode',
    data: { label: 'template node' },
    position: { x: 300, y: 50 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const flowCharts = [
    {
      value: 'tab1',
      title: 'Flow 1',
      colaborators: [
        {
          id: '1',
          name: 'John Doe',
          initials: 'JD',
        },
        {
          id: '2',
          name: 'Jane Doe',
          initials: 'DJ',
        },
      ],
    },
    {
      value: 'tab2',
      title: 'Flow 3',
      colaborators: [
        {
          id: '4',
          name: 'Mark Smith',
          initials: 'MS',
        },
      ],
    },
  ];

  const FlowTabsProps = {
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    onConnect: onConnect,
    onInit: setReactFlowInstance,
    onDrop: onDrop,
    onDragOver: onDragOver,
    nodeTypes: nodeTypes,
  };

  return (
    <>
      <div>
        {/* <NxWelcome title="toolai" /> */}
        <SignIn />
        <SignUp />
        <AuthDetails />
      </div>
      <Header />
      <div className="dndflow">
        <ReactFlowProvider>
          <NodeSideBar />
          <FlowTabs
            flowCharts={flowCharts}
            reactFlowWrapper={reactFlowWrapper}
            {...FlowTabsProps}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default DnDFlow;
