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
import Header from '../../Navigation/Header/Header';
import { store, flowTabActions } from '@tool-ai/state';
import { dispatchToStore } from '@libs/auth';
import {
  User,
  mockUser,
  ButtonComponent,
  saveFlow,
  switchFlowTab,
} from '@tool-ai/ui';
import { useFlowRunner } from '@tool-ai/flow-runner';
import * as firestoreService from '@libs/firestore-service';

const nodeTypes = {
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

  const currentUser = useSelector((state: any) => state.user.userData);
  // const flowTabs = useSelector((state: any) => state.flowTabs);

  const persistNewFlow = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
        console.log('Saving to State Mngm & DB, ', e.ctrlKey, e.key, e.metaKey);
        saveFlow(nodes, edges);
      }
    },
    [nodes, edges]
  );

  const loadFlows = function (sessionUser: User) {
    sessionUser.flows.forEach((flow) => {
      const flowEntity = {
        id: flow.id,
        nodes: JSON.parse(flow.stringifiedNodes),
        edges: JSON.parse(flow.stringifiedEdges),
      };
      store.dispatch(flowTabActions.addNewFlowTab(flowEntity));
    });

    store.dispatch(flowTabActions.setActiveFlowTab(sessionUser.flows[0].id));
    setNodes(JSON.parse(sessionUser.flows[0].stringifiedNodes));
    setEdges(JSON.parse(sessionUser.flows[0].stringifiedEdges));
  };
  // This loads the initial user and flow data from the user
  useEffect(() => {
    let sessionUser = store.getState().user.userData;

    if (sessionUser.id === '') {
      // for local development only
      firestoreService
        .getSomeFromDB('users', 'id', '==', 'testId')
        .then((data) => {
          if (data.length > 0) {
            sessionUser = data[0] as User;
          } else {
            sessionUser = mockUser;
            firestoreService.writeToDB('users', sessionUser);
          }
          dispatchToStore(sessionUser as User);
          loadFlows(sessionUser as User);
        });
    } else {
      loadFlows(sessionUser as User);
    }
  }, [setEdges, setNodes]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // save & load the nodes and edges of the tabs that we switched
  const changeTabState = useCallback(
    (tabId: string) => {
      const currentFlowTab = switchFlowTab(tabId, nodes, edges);
      if (currentFlowTab) {
        setNodes(currentFlowTab.nodes);
        setEdges(currentFlowTab.edges);
      }
    },
    [nodes, edges, setNodes, setEdges]
  );

  // Trigger the effect when nodes or edges change
  useEffect(() => {
    // console.log('updated flowState: ', nodes, edges);
  }, [nodes, edges]);

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
    [reactFlowInstance, setNodes]
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
    onTabChange: changeTabState,
  };

  const { flow, setFlow, executeFlow } = useFlowRunner();

  // useEffect(() => {
  //   console.log('flow', flow);
  // }, [flow]);

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

      <div
        onKeyDown={persistNewFlow}
        className="relative flex flex-col grow h-full md:flex-row"
      >
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
