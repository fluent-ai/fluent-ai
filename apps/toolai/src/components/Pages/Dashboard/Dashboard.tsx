// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeSideBar from '../../Navigation/NodeSideBar/NodeSideBar';
import FlowTabs from '../../Navigation/FlowTabs/FlowTabs';
import TemplateNode from '../../Nodes/TemplateNode/TemplateNode';
//import { NodeWrapperComponent } from '@tool-ai/ui';
import Header from '../../Navigation/Header/Header';
import { ButtonComponent } from '@tool-ai/ui';
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
  {
    id: '2',
    type: 'json',
    data: {
      label: 'JSON',
    },
    msg :{
      name: "Mr Wiggles",
      color: "pink",
      number: 3,
      balloons: true
  },
    position: { x: 300, y: 50 },
  },
  {
    id: '3',
    type: 'template',
    data: {
      label: 'Template',
    },
    props: {
      template: `Hello {{msg.payload.name}}!
        Here! have {{msg.payload.number}} {{msg.payload.color}} balloons.`,
    },
    msg: {
      payload : "Hello Mr Wiggles!\n        Here! have 3 pink balloons."
    },
    position: { x: 300, y: 50 },
  },
  {
    id: '4',
    type: 'preview',
    data: { label: 'Preview' },
    msg: {
      payload : "Hello Mr Wiggles!\n        Here! have 3 pink balloons."
    },
    position: { x: 300, y: 50 },
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Output' },
    msg: {
      payload : "Hello Mr Wiggles!\n        Here! have 3 pink balloons."
    },
    position: { x: 650, y: 25 },
  },
  {
    id: '6',
    type: 'userFunction',
    data: {
      label: 'Function',
    },
    props: {
      userFunction: 'msg.payload.number = msg.payload.number * 2; return msg',
    },
    msg :{
      name: "Mr Wiggles",
      color: "pink",
      number: 6,
      balloons: true
  },
    position: { x: 650, y: 25 },
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Output' },
    msg :{
      name: "Mr Wiggles",
      color: "pink",
      number: 6,
      balloons: true
  },
    position: { x: 650, y: 25 },
  },
  {
    id: '8',
    type: 'template',
    data: {
      label: 'Template',
    },
    props: {
      template: `Im a redundant template!`,
    },
    msg: {
      payload: `Im a redundant template!`,
    },
    position: { x: 300, y: 50 },
  },
];

const initialEdges = [
  {
    "source" : "1",
    "sourceHandle" : null,
    "target" : "2",
    "targetHandle" : null,
    "id" : "reactflow__edge-1-2"
  },
  {
    "source" : "2",
    "sourceHandle" : "b",
    "target" : "3",
    "targetHandle" : null,
    "id" : "reactflow__edge-2b-3"
  },
  {
    "source" : "2",
    "sourceHandle" : "b",
    "target" : "6",
    "targetHandle" : null,
    "id" : "reactflow__edge-2b-6"
  },
  {
    "source" : "3",
    "sourceHandle" : "b",
    "target" : "4",
    "targetHandle" : null,
    "id" : "reactflow__edge-3b-4"
  },
  {
    "source" : "4",
    "sourceHandle" : "b",
    "target" : "5",
    "targetHandle" : null,
    "id" : "reactflow__edge-4b-5"
  },
  {
    "source" : "6",
    "sourceHandle" : "b",
    "target" : "7",
    "targetHandle" : null,
    "id" : "reactflow__edge-6b-7"
  }
]


let id = 0;
const getId = () => `dndnode_${id++}`;

const Dashboard = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
        data: { label: `${type}` },
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
    setNodes: setNodes,
    onConnect: onConnect,
    onInit: setReactFlowInstance,
    onDrop: onDrop,
    onDragOver: onDragOver,
    nodeTypes: nodeTypes,
  };


  const { flow, setFlow, executeFlow,  } = useFlowRunner();

  useEffect(() => {
    console.log('flow', flow);
  }, [flow]);


  function runFlow () {console.log('Running')}


  return (
    <>
    <Header />
    <div className='h-10 w-32 mt-2.5 ml-72 bg-white absolute shadow-md rounded-md z-10 text-black flex justify-between items-center'>
    <ButtonComponent
      buttonContent='RUN'
      type='button'
      classes='icons'
      ariaLabel='run flow'
      clickHandler={runFlow} />
      </div>

      <div className="relative flex flex-col grow h-full md:flex-row">
        <ReactFlowProvider>
          <button onClick={() => {
            console.log('executing flow');
            setFlow({ nodes, edges });
            setTimeout(() => {
            executeFlow()
            }, 100);
          } }>my button</button>
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

export default Dashboard;
