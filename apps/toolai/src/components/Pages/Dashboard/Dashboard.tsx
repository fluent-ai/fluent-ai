// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useState, useRef, useCallback } from 'react';
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

const nodeTypes = {
  templateNode: TemplateNode,
  template: TemplateNode,
  json: TemplateNode,
  userFunction: TemplateNode,
  preview: TemplateNode,
};

const initialNodes = [
  {
    "id" : "1",
    "type" : "input",
    "data" : {
      "label" : "Text input"
    },
    "props" : {
      "input" : `{
        "name" : "Mr Wiggles",
        "color" : "pink",
        "number" : 3,
        "balloons" : true
      }
      `},
    "position" : {
      "x" : 248.16855753646684,
      "y" : -176.77471636953
    },
    "width" : 150,
    "height" : 40,
    "selected" : false,
    "positionAbsolute" : {
      "x" : 248.16855753646684,
      "y" : -176.77471636953
    },
    "dragging" : false
  },
  {
    "id" : "2",
    "type" : "json",
    "data" : {
      "label" : "JSON"
    },
    "position" : {
      "x" : 302.1393841166937,
      "y" : -94.76499189627229
    },
    "width" : 42,
    "height" : 23,
    "selected" : true,
    "positionAbsolute" : {
      "x" : 302.1393841166937,
      "y" : -94.76499189627229
    },
    "dragging" : false
  },
  {
    "id" : "3",
    "type" : "template",
    "data" : {
      "label" : "Template1"
    },
    "props" : {
      "template" : `Hello {{msg.payload.name}}!\n        Here! have {{msg.payload.number}} {{msg.payload.color}} balloons.`
    },
    "position" : {
      "x" : 180.90761750405184,
      "y" : -21.312803889789308
    },
    "width" : 72,
    "height" : 23,
    "selected" : false,
    "positionAbsolute" : {
      "x" : 180.90761750405184,
      "y" : -21.312803889789308
    },
    "dragging" : false
  },
  {
    "id" : "4",
    "type" : "preview",
    "data" : {
      "label" : "Preview"
    },
    "position" : {
      "x" : 188.7520259319287,
      "y" : 49.2868719611021
    },
    "width" : 56,
    "height" : 23,
    "selected" : false,
    "positionAbsolute" : {
      "x" : 188.7520259319287,
      "y" : 49.2868719611021
    },
    "dragging" : false
  },
  {
    "id" : "5",
    "type" : "output",
    "data" : {
      "label" : "Output"
    },
    "position" : {
      "x" : 140.8265802269043,
      "y" : 133.39546191247976
    },
    "width" : 150,
    "height" : 40,
    "selected" : false,
    "positionAbsolute" : {
      "x" : 140.8265802269043,
      "y" : 133.39546191247976
    },
    "dragging" : false
  },
  {
    "id" : "6",
    "type" : "userFunction",
    "data" : {
      "label" : "Function"
    },
    "props" : {
      "userFunction" : "msg.payload.number = msg.payload.number * 2; return msg"
    },
    "position" : {
      "x" : 366.88816855753635,
      "y" : 15.729335494327406
    },
    "width" : 62,
    "height" : 23,
    "selected" : false,
    "positionAbsolute" : {
      "x" : 366.88816855753635,
      "y" : 15.729335494327406
    },
    "dragging" : false
  },
  {
    "id" : "7",
    "type" : "output",
    "data" : {
      "label" : "Output"
    },
    "position" : {
      "x" : 319.82171799027543,
      "y" : 135.53484602917342
    },
    "width" : 150,
    "height" : 40,
    "selected" : false,
    "positionAbsolute" : {
      "x" : 319.82171799027543,
      "y" : 135.53484602917342
    },
    "dragging" : false
  },
  {
    "id" : "8",
    "type" : "template",
    "data" : {
      "label" : "Template2"
    },
    "props" : {
      "template" : "Im a redundant template!"
    },
    "position" : {
      "x" : 504.66774716369525,
      "y" : 7.2123176661264115
    },
    "width" : 75,
    "height" : 23,
    "selected" : false,
    "positionAbsolute" : {
      "x" : 504.66774716369525,
      "y" : 7.2123176661264115
    },
    "dragging" : false
  }
]
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
        data: { label: `${type} node` },
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
    onConnect: onConnect,
    onInit: setReactFlowInstance,
    onDrop: onDrop,
    onDragOver: onDragOver,
    nodeTypes: nodeTypes,
  };

  

  return (
    <>
    <Header />
      <div className="relative flex flex-col grow h-full md:flex-row">
        <ReactFlowProvider>
          <button onClick={() => console.log(JSON.stringify({nodes, edges}))}>my button</button>
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
