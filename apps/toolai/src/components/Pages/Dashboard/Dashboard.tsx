// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeSideBar from '../../Navigation/NodeSideBar/NodeSideBar';
import FlowTabs from '../../Navigation/FlowTabs/FlowTabs';
import TemplateNode from '../../Nodes/TemplateNode/TemplateNode';
//import { NodeWrapperComponent } from '@tool-ai/ui';
import Header from '../../Navigation/Header/Header';
import { store } from '@tool-ai/state';
import { User } from '@tool-ai/ui';
import { ButtonComponent } from '@tool-ai/ui';
import { useFlowRunner } from '@tool-ai/flow-runner';

const nodeTypes = {
  textInput: TemplateNode,
  template: TemplateNode,
  json: TemplateNode,
  userFunction: TemplateNode,
  preview: TemplateNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Text input',
    },
    props: {
      input: `{
          "name" : "Mr Wiggles",
          "color" : "pink",
          "number" : 3,
          "balloons" : true
        }
        `,
    },
    msg: {
      payload: `{
          "name" : "Mr Wiggles",
          "color" : "pink",
          "number" : 3,
          "balloons" : true
        }
        `,
    },
    position: { x: 0, y: 50 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Dashboard = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [user, updateUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    initials: '',
    flows: [],
  });

  const flowTabs = useSelector((state: any) => state.flowtabs.tabs);
  const currentUser = { ...user };

  useEffect(() => {
    const sessionUser = store.getState().user.userData;
    updateUser(sessionUser as User);
  }, []);

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
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const FlowTabsProps = {
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    setNodes: setNodes,
    onConnect: onConnect,
    onInit: setReactFlowInstance,
    onDrop: onDrop,
    onDragOver: onDragOver,
    nodeTypes: nodeTypes,
  };

  function runFlow() {
    console.log('Running');
  }

  const { flow, setFlow, executeFlow } = useFlowRunner();

  useEffect(() => {
    console.log('flow', flow);
  }, [flow]);

  return (
    <>
      <Header currentUser={currentUser} />
      <div className="h-10 w-32 mt-2.5 ml-72 bg-white absolute shadow-md rounded-md z-10 text-black flex justify-between items-center">
        <ButtonComponent
          buttonContent="RUN"
          type="button"
          classes="icons"
          ariaLabel="run flow"
          clickHandler={runFlow}
        />
      </div>

      <div className="relative flex flex-col grow h-full md:flex-row">
        <ReactFlowProvider>
          <button
            onClick={() => {
              console.log('executing flow');
              setFlow({ nodes, edges });
              setTimeout(() => {
                executeFlow();
              }, 100);
            }}
          >
            my button
          </button>
          <NodeSideBar />
          <FlowTabs
            flowCharts={flowTabs}
            reactFlowWrapper={reactFlowWrapper}
            {...FlowTabsProps}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Dashboard;
