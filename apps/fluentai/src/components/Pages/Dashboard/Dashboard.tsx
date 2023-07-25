import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, {
  ReactFlowProvider,
  BackgroundVariant,
  Background,
  Controls,
  NodeChange,
  EdgeChange,
  NodeSelectionChange,
} from 'reactflow';

import 'reactflow/dist/style.css';

import NodeSideBar from '../../Navigation/NodeSideBar/NodeSideBar';
import TemplateNode from '../../Nodes/TemplateNode/TemplateNode';
import Header from '../../Navigation/Header/Header';
import FlowHeader from '../../Navigation/FlowHeader/FlowHeader';
import {
  flowRunnerActions,
  flowActions,
  flowSelectors,
} from '@tool-ai/state';
import { useFlowRunner } from '@tool-ai/flow-runner';
import { NodeData } from '../../../nodeData';
import { NodeDialogComponent } from '@tool-ai/ui';

const nodeTypes = {
  textFileInput: TemplateNode,
  deepl: TemplateNode,
  textInput: TemplateNode,
  template: TemplateNode,
  condition: TemplateNode,
  json: TemplateNode,
  userFunction: TemplateNode,
  preview: TemplateNode,
  openAi: TemplateNode,
  dalleGeneration: TemplateNode,
  dalleVariation: TemplateNode,
  download: TemplateNode,
  localhost: TemplateNode,
};



const Dashboard = () => {
  const dispatch = useDispatch();
  // --------------------------------------     Hooks & State - React Flow    --------------------------------------
  const reactFlowWrapper = useRef<any>(null);
  const nodes = useSelector(flowSelectors.getNodes);
  const edges = useSelector(flowSelectors.getEdges);
  const inputs = useSelector(flowSelectors.getInputs);


  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  // --------------------------------------     Hooks & State - Flow Runner   --------------------------------------
  const { executeFlow, outputs, states } = useFlowRunner();

  // ------------------------------------------------     React Flow     --------------------------------------------
  // React Flow Events
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(flowActions.applyNodeChanges(changes));
      const primary = changes.find((change) => change.type === 'select' && change.selected) as NodeSelectionChange;
      if(primary) {
        dispatch(flowActions.setIsDialogOpen(true))
        dispatch(flowActions.setActiveNodeId(primary.id))
      }
    }
    ,
    [dispatch]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(flowActions.applyEdgeChanges(changes));
    }
    ,
    [dispatch]
  );


  const onConnect = useCallback(
    (params: any) => dispatch(flowActions.addEdge(params)),
    [dispatch]
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
        if (item)
        return {
          type: item.type,
          label:item.label,
          group:item.group
        };
      };

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { ...getData(`${type}`) },
      };
      dispatch(flowActions.addNode(newNode));
    },
    [reactFlowInstance, dispatch]
  );

  // ------------------------------------------------     Flow Runner     --------------------------------------------
  // Flow Runner - On change
  useEffect(() => {
    dispatch(flowRunnerActions.setStates(states));
    dispatch(flowRunnerActions.setOutputs(outputs));
  }, [outputs, states, dispatch]);
  // Flow Runner - Runner callback
  function runFlow() {
    console.log('🌊 executing flow');
    executeFlow({
      flow: { nodes, edges },
      inputs,
      globals: {},
    });
  }
  return (
    <>
      <Header/>
      <FlowHeader/>
      <div
        className="relative flex flex-col grow h-full md:flex-row"
      >
        <ReactFlowProvider>
          <NodeSideBar runFlow={runFlow}/>
            <div
              className="flex-grow h-screen w-screen relative z-0"
              ref={reactFlowWrapper}
            >
              <ReactFlow
                  onInit={setReactFlowInstance}
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onNodesDelete={() => dispatch(flowActions.setIsDialogOpen(false))}
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
            <NodeDialogComponent />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Dashboard;
