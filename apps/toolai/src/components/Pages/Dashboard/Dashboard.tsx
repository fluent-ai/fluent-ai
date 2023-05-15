import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeSideBar from '../../Navigation/NodeSideBar/NodeSideBar';
import FlowTabs from '../../Navigation/FlowTabs/FlowTabs';
import TemplateNode from '../../Nodes/TemplateNode/TemplateNode';
//import { NodeWrapperComponent } from '@tool-ai/ui';
import Header from '../../Navigation/Header/Header';
import { store } from '@tool-ai/state';
import { User, mockUser } from '@tool-ai/ui';
import { ButtonComponent } from '@tool-ai/ui';
import { useFlowRunner } from '@tool-ai/flow-runner';

const nodeTypes = {
  txtFileInput: TemplateNode,
  deepl: TemplateNode,
  textInput: TemplateNode,
  template: TemplateNode,
  json: TemplateNode,
  userFunction: TemplateNode,
  preview: TemplateNode,
  openAi: TemplateNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const Dashboard = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [user, updateUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    initials: '',
    flows: [],
  });

  const currentUser = { ...user };
  currentUser.flows = useSelector((state: any) => state.user.userData.flows);
  //console.log('dashboard component, current user', currentUser);

  useEffect(() => {
    const sessionUser = store.getState().user.userData;
    console.log(sessionUser);

    if (sessionUser.id === '') {
      // for local development only
      updateUser(mockUser);
    } else {
      updateUser(sessionUser as User);
    }
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

  const { flow, setFlow, executeFlow } = useFlowRunner();

  useEffect(() => {
    console.log('flow', flow);
  }, [flow]);

  function runFlow() {
    console.log('Running');
  }
  if (currentUser.id === '') {
    return <div></div>;
  }
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
          <NodeSideBar />
          <FlowTabs
            flowCharts={currentUser.flows}
            reactFlowWrapper={reactFlowWrapper}
            {...FlowTabsProps}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Dashboard;
