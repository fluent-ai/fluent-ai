import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Header from '../../Navigation/Header/Header';
import { store, flowRunnerActions, flowRunnerSelectors } from '@tool-ai/state';
import { User, mockUser, ButtonComponent } from '@tool-ai/ui';
import { useFlowRunner } from '@tool-ai/flow-runner';

const nodeTypes = {
  txtFileInput: TemplateNode,
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
  // Hooks & State
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
  const {
    setFlow,
    setInputs, 
    setGlobals,
    executeFlow,
    globals,
    outputs,
    states,
  } = useFlowRunner();
  const dispatch = useDispatch();
  const inputs = useSelector(flowRunnerSelectors.selectInputs);

  // React Flow
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

  // Flow Runner - Init
  useEffect(() => {
    console.log('🌊 initializing');
    setGlobals({
      openAiApiKey: process.env.NX_OPENAI_API_KEY
     })
  }, [setGlobals]);
  // Flow Runner - On change
  useEffect(() => {
    console.log('🌊 change detected\n',{outputs,states} );
    dispatch(flowRunnerActions.setStates(states));
    dispatch(flowRunnerActions.setOutputs(outputs));
  }, [
    outputs,states,dispatch]);
  // Flow Runner - Runner callback
  function runFlow() {
    console.log('🌊 preparing ');
    setFlow({nodes, edges});
    console.log('🌊 setting inputs',inputs);
    setInputs(inputs);
    setTimeout(() => {
      console.log('🌊 executing flow');
      executeFlow();
    }, 500);
  }

  // User & Auth 
  const currentUser = { ...user };
  currentUser.flows = useSelector((state: any) => state.user.userData.flows);
  useEffect(() => {
    const sessionUser = store.getState().user.userData;
    if (sessionUser.id === '') {
      // for local development only
      updateUser(mockUser);
    } else {
      updateUser(sessionUser as User);
    }
  }, []);
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