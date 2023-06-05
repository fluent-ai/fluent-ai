import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Background,
  Controls,
} from 'reactflow';

import 'reactflow/dist/style.css';

import NodeSideBar from '../../Navigation/NodeSideBar/NodeSideBar';
import TemplateNode from '../../Nodes/TemplateNode/TemplateNode';
import CommentNode from '../../Nodes/CommentNode/CommentNode';
import Header from '../../Navigation/Header/Header';
import {
  flowRunnerActions,
  flowRunnerSelectors,
} from '@tool-ai/state';
import { useFlowRunner } from '@tool-ai/flow-runner';
import { NodeData } from '../../../nodeData';
// import Flow from '../../Navigation/Flow/Flow';
import Context from '../../context/context';
import { NodeDialogComponent } from '@tool-ai/ui';

const nodeTypes = {
  commentNode: CommentNode,
  textFileInput: TemplateNode,
  deepl: TemplateNode,
  textInput: TemplateNode,
  template: TemplateNode,
  json: TemplateNode,
  userFunction: TemplateNode,
  preview: TemplateNode,
  openAi: TemplateNode,
  dalleGeneration: TemplateNode,
  dalleVariation: TemplateNode,
  download: TemplateNode,
};



const Dashboard = () => {
  const currentUser = {
    id: "a-dcasfvsvsvs",
    name: "John Doe",
    initials: "JD",
    email: "j.doe@example.com",
    flows: [],
    profileImg: "",
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState('');
  const [activeNodeId, setActiveNodeId] = useState('');
  // --------------------------------------     Hooks & State - React Flow    --------------------------------------
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  // --------------------------------------     Hooks & State - Flow Runner   --------------------------------------
  const { executeFlow, outputs, states } = useFlowRunner();
  const dispatch = useDispatch();
  const inputs = useSelector(flowRunnerSelectors.selectInputs);


  // ------------------------------------------------     React Flow     --------------------------------------------
  // React Flow Events
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent) => {
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
      const getData = (type: string) => {
        const item = NodeData.find((nodeItem) => nodeItem.type === type);
        if (item) return item;
      };

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { ...getData(`${type}`) },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // ------------------------------------------------     Flow Runner     --------------------------------------------
  // Flow Runner - On change
  useEffect(() => {
    console.log('🌊 change detected\n', { outputs, states });
    dispatch(flowRunnerActions.setStates(states));
    dispatch(flowRunnerActions.setOutputs(outputs));
  }, [outputs, states, dispatch]);
  // Flow Runner - Runner callback
  function runFlow() {
    console.log('🌊 executing flow');
    executeFlow({
      flow: { nodes, edges },
      inputs,
      globals: {
        deeplApiKey: process.env.NX_DEEPL_API_KEY,
        openAiApiKey: process.env.NX_OPENAI_API_KEY,
      },
    });
  }
  return (
    <>
      <Header currentUser={currentUser} />
      <div
        className="relative flex flex-col grow h-full md:flex-row"
      >
        <ReactFlowProvider>
          <NodeSideBar runFlow={runFlow}/>
          <Context.Provider
            value={{  
              isDialogOpen,
              setIsDialogOpen,
              setActiveDialog,
              setActiveNodeId,
            }}
          >
            <div
              className="flex-grow h-screen w-screen realtive z-0"
              ref={reactFlowWrapper}
            >
              <ReactFlow
                  onInit={setReactFlowInstance}
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onDrop={onDrop}
                  selectionOnDrag
                  onDragOver={onDragOver}
                  nodeTypes={nodeTypes}
                  fitView
                  defaultViewport={{ x: 0, y: 0, zoom: -2 }}
              >
                  <Background
                  variant={'dots' as BackgroundVariant}
                  gap={12}
                  size={1}
                  />
                  <Controls position="bottom-right" />
              </ReactFlow>
            </div>
            <NodeDialogComponent
                  isOpen={isDialogOpen}
                  onClose={setIsDialogOpen}
                  activeDialog={activeDialog}
                  nodes={nodes}
                  setNodes={setNodes}
                  activeNodeId={activeNodeId}
                />
          </Context.Provider>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Dashboard;
