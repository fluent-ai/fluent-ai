import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
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
import { store, flowRunnerActions, flowRunnerSelectors, flowTabActions } from '@tool-ai/state';
import {
  User,
  mockUser,
  ButtonComponent,
  saveFlow,
  switchFlowTab,
} from '@tool-ai/ui';
import { useFlowRunner } from '@tool-ai/flow-runner';
import * as firestoreService from '@libs/firestore-service';
import { dispatchToStore } from '@libs/auth';

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



const Dashboard = () => {
  // --------------------------------------     Hooks & State - React Flow    --------------------------------------
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  // Hooks & State - User
  // --------------------------------------       Hooks & State - User       --------------------------------------
  const currentUser = useSelector((state: any) => state.user.userData);
  const [user, updateUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    initials: '',
    flows: [],
  });
  // --------------------------------------     Hooks & State - Flow Runner   --------------------------------------
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
  // -----------------------------------------------     User & Auth    --------------------------------------------
  useEffect(() => {
    const sessionUser = store.getState().user.userData;
    if (sessionUser.id === '') {
      // for local development only
      updateUser(mockUser);
    } else {
      updateUser(sessionUser as User);
    }
  }, []);


  // ------------------------------------------------     Database     --------------------------------------------
  // Saving & Loading Flows
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
  const loadFlows = useCallback((sessionUser: User) => {
    if(sessionUser) {
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
    }
  }, [setNodes, setEdges]);
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
  }, [setEdges, setNodes, loadFlows]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  
  // ------------------------------------------------     Tabs     --------------------------------------------
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


  // ------------------------------------------------     React Flow     --------------------------------------------
  // React Flow Events
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
        id: uuidv4(),
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

  // ------------------------------------------------     Flow Runner     --------------------------------------------
  // Flow Runner - Init
  useEffect(() => {
    console.log('🌊 initializing');
    setGlobals({
      deeplApiKey: process.env.NX_DEEPL_API_KEY,
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


  // This is a hack, refactor me
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