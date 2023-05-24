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
import CommentNode from '../../Nodes/CommentNode/CommentNode';
import Header from '../../Navigation/Header/Header';
import {
  store,
  flowRunnerActions,
  flowRunnerSelectors,
  flowTabActions,
} from '@tool-ai/state';
import {
  User,
  ButtonComponent,
  saveFlow,
  switchFlowTab,
  mockUser,
  mockFlow,
} from '@tool-ai/ui';
import { useFlowRunner } from '@tool-ai/flow-runner';
import * as firestoreService from '@libs/firestore-service';
import { SocketClient } from '@libs/socket-client';
import { dispatchToStore } from '@libs/auth';
import { NodeData } from '../../../nodeData';
import { Auth, getAuth } from 'firebase/auth';

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
  // --------------------------------------     Hooks & State - React Flow    --------------------------------------
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  // --------------------------------------       Hooks & State - User       --------------------------------------
  const currentUser = useSelector((state: any) => state.user.userData);
  const currentFlows = useSelector(
    (state: any) => state.flowTab.flowTabs.flows
  );
  let auth: Auth | null = null;
  useEffect(() => {
    auth = getAuth();
  }, []);
  // --------------------------------------     Hooks & State - Flow Runner   --------------------------------------
  const { executeFlow, outputs, states } = useFlowRunner();
  const dispatch = useDispatch();
  const inputs = useSelector(flowRunnerSelectors.selectInputs);
  // -----------------------------------------------     User & Auth    --------------------------------------------
  // useEffect(() => {
  //   const sessionUser = store.getState().user.userData;
  //   if (sessionUser.id === '') {
  //     // for local development only
  //     // updateUser(mockUser);
  //     // updateUser(sessionUser as User);
  //     console.log('No user found, redirecting to login');
  //   } else {
  //     updateUser(sessionUser as User);
  //   }
  // }, []);

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
  const loadFlows = useCallback(
    async (sessionUser: User) => {
      const flows = await firestoreService.getSomeFromDB(
        'flows',
        'collaboratorIds',
        'array-contains',
        sessionUser.id
      );
      if (flows.length > 0) {
        flows.forEach((flow) => {
          const flowEntity = {
            id: flow.id,
            title: flow.title,
            ownerId: flow.ownerId,
            nodes: JSON.parse(flow.stringifiedNodes),
            edges: JSON.parse(flow.stringifiedEdges),
            collaboratorIds: flow.collaboratorIds,
            collaborators: flow.collaborators,
          };
          store.dispatch(flowTabActions.addNewFlowTab(flowEntity));
        });

        store.dispatch(flowTabActions.setActiveFlowTab(flows[0].id));
        setNodes(JSON.parse(flows[0].stringifiedNodes));
        setEdges(JSON.parse(flows[0].stringifiedEdges));
      }

      // TODO: if no flows, create one
    },
    [setEdges, setNodes]
  );
  // // This loads the initial user and flow data from the user
  // useEffect(() => {
  //   let sessionUser = store.getState().user.userData;

  //   if (sessionUser.id === '') {
  //     // for local development only
  //     firestoreService
  //       .getSomeFromDB('users', 'id', '==', '1aUOgbQFrvWfdNj3zES1C1l8ofC3')
  //       .then((data) => {
  //         if (data.length > 0) {
  //           sessionUser = data[0] as User;
  //         } else {
  //           sessionUser = mockUser;
  //           firestoreService.writeToDB('users', sessionUser);
  //           firestoreService.writeToDB('flows', mockFlow);
  //         }
  //         dispatchToStore(sessionUser as User);
  //         loadFlows(sessionUser as User);
  //       });
  //   } else {
  //     loadFlows(sessionUser as User);
  //   }
  // }, [loadFlows]);

  //       store.dispatch(flowTabActions.setActiveFlowTab(flows[0].id));
  //       setNodes(JSON.parse(flows[0].stringifiedNodes));
  //       setEdges(JSON.parse(flows[0].stringifiedEdges));
  //     }
  //   },
  //   [setNodes, setEdges]
  // );

  // This loads the initial user and flow data from the user
  const InitialUser = useCallback(
    async (auth: Auth) => {
      console.log('🌈 auth', auth);
      // console.log('🌈 auth', auth?.AuthImpl?.currentUser);
      let sessionUser = store.getState().user.userData;
      if (sessionUser.id === '') {
        console.log('auth?.currentUser', auth?.currentUser);
        const userId = auth?.currentUser?.uid;
        if (userId) {
          /* eslint-disable-next-line */
          firestoreService
            .getSomeFromDB('users', 'id', '==', userId)
            .then((data) => {
              if (data.length > 0) {
                sessionUser = data[0] as User;
              }
            });
        } else {
          console.log('No user found, redirecting to login');
          return;
        }
      }
      console.log(
        '🚀 ~ file: Dashboard.tsx:112 ~ useEffect ~ sessionUser:',
        sessionUser.id
      );
      dispatchToStore(sessionUser as User);
      loadFlows(sessionUser as User);
    },
    [loadFlows]
  );

  useEffect(() => {
    if (auth) {
      InitialUser(auth);
    }
  }, [auth, InitialUser]);

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
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSocketChange = useCallback(
    (flow: any) => {
      setNodes(flow.nodes);
      setEdges(flow.edges);
    },
    [setNodes, setEdges]
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
      <SocketClient
        userId={currentUser.id}
        userName={currentUser.name}
        nodes={[...nodes]}
        edges={[...edges]}
        onChangeFlow={handleSocketChange}
      />
      <Header currentUser={currentUser} />

      <div
        // onKeyDown={persistNewFlow}
        className="relative flex flex-col grow h-full md:flex-row"
      >
        <ReactFlowProvider>
          <NodeSideBar runFlow={runFlow} />
          <FlowTabs
            currentUserId={currentUser.id}
            flowCharts={currentFlows}
            reactFlowWrapper={reactFlowWrapper}
            {...FlowTabsProps}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Dashboard;
