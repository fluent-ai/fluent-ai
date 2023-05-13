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
import { store, userActions, flowTabActions } from '@tool-ai/state';
import * as firestoreService from '@libs/firestore-service';
import { User, mockUser } from '@tool-ai/ui';
import { ButtonComponent } from '@tool-ai/ui';
import { useFlowRunner } from '@tool-ai/flow-runner';

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
  const [user, updateUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    initials: '',
    flows: [],
  });

  const currentUser = { ...user };
  currentUser.flows = useSelector((state: any) => state.user.userData.flows);
  // const activeTab: string = useSelector((state: any) => state.activeTab.id);

  const persistNewFlow = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
        console.log('Saving to State Mngm & DB, ', e.ctrlKey, e.key, e.metaKey);

        store.dispatch(userActions.setLoadingStatus('loading'));
        const currentState = store.getState();
        const currentUser = currentState.user.userData;
        const activeTab = currentState.flowTab.flowTabs.activeId;

        // store user state in redux
        const activeFlowIndex = currentUser.flows.findIndex(
          (flow) => flow.id === activeTab
        );

        if (activeFlowIndex !== -1) {
          const writableFlow = { ...currentUser.flows[activeFlowIndex] };

          writableFlow.stringifiedNodes = JSON.stringify(nodes);
          writableFlow.stringifiedEdges = JSON.stringify(edges);

          const newFlows = [];
          for (let i = 0; i < currentUser.flows.length; i++) {
            if (i === activeFlowIndex) {
              newFlows.push(writableFlow);
            } else {
              newFlows.push({ ...currentUser.flows[i] });
            }
          }

          const newUser = { ...currentUser, flows: newFlows };
          store.dispatch(userActions.updateUserData(newUser));

          // update flow in firestore
          //const updatedUser = store.getState().user.userData;
          //console.log(currentUser, newUser, updatedUser);
          firestoreService.updateFirestoreDocument(
            'users',
            newUser.id,
            newUser
          );
          console.log('updated User: ', newUser);
        }
        store.dispatch(userActions.setLoadingStatus('loaded'));
      }
    },
    [nodes, edges]
  );

  // This loads the initial user and flow data from the user
  useEffect(() => {
    const sessionUser = store.getState().user.userData;

    if (sessionUser.id === '') {
      // for local development only
      updateUser(mockUser);
    } else {
      updateUser(sessionUser as User);
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
  }, []);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // save & load the nodes and edges of the tabs that we switched
  const changeTabState = useCallback(
    (tabId: string) => {
      // save current active state
      const activeId = store.getState().flowTab.flowTabs.activeId;
      if (tabId === activeId) return;
      const flowTabToSave = {
        id: activeId,
        nodes: nodes,
        edges: edges,
      };
      store.dispatch(flowTabActions.saveCurrentFlowTab(flowTabToSave));

      // load new tab
      store.dispatch(flowTabActions.setActiveFlowTab(tabId));

      // useState on current node and edges
      const currentFlowTab = store
        .getState()
        .flowTab.flowTabs.flows.find((flow) => flow.id === tabId);

      if (currentFlowTab) {
        setNodes(currentFlowTab.nodes);
        setEdges(currentFlowTab.edges);
      }
    },
    [nodes, edges, setNodes, setEdges]
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

  useEffect(() => {
    // console.log('updated flowState: ', nodes, edges);
  }, [nodes, edges]); // Trigger the effect when nodes or edges change

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
