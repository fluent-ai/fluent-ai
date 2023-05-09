import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import {ReactFlow, Node, Edge, Controls, Background, BackgroundVariant } from 'reactflow';
import { PlusIcon } from '@radix-ui/react-icons';
import TooltipComponent from '../../UI/Tooltip/Tooltip';
import FlowTabsDropdown from '../../UI/FlowTabsDropdown/FlowTabsDropdown';
import { mock } from 'node:test';
import AvatarComponent from '../../UI/AvatarComponent/AvatarComponent';
import NodeDialogComponent from '../../UI/NodeDialogComponent/NodeDialogComponent';
import Context from '../../context/context';
import styles from './FlowTabs.module.css'

interface FlowTabsProps {
  flowCharts: any,
  reactFlowWrapper: any
  nodes: Node<{ label: string; }, string | undefined>[],
  edges:Edge<any>[],
  onNodesChange:any,
  onEdgesChange:any,
  onConnect:any,
  onInit:any,
  onDrop:any,
  onDragOver:any,
  nodeTypes:any
}

interface User {
  id: string,
  name: string,
  initials: string
}

interface FlowChart {
  value: string,
  title: string,
  colaborators: User[]
}
const FlowTabs = (props: FlowTabsProps) => {

const [isDialogOpen, setIsDialogOpen] = React.useState(false);
return (
  <Context.Provider value={{isDialogOpen, setIsDialogOpen}}>
      <ReactFlow
        ref={props.reactFlowWrapper}
        nodes={props.nodes}
        edges={props.edges}
        onConnect={props.onConnect}
        onInit={props.onInit}
        onDrop={props.onDrop}
        onDragOver={props.onDragOver}
        nodeTypes={props.nodeTypes}
      />
  <Tabs.Root className="flex flex-col" defaultValue="tab1">
    <Tabs.List className="absolute my-2.5 mx-2.5 z-10 bg-white w-50 border-2 border-inherit rounded-md right-0 flex items-center" aria-label="Flow Tabs">
      {/*each tab would be dynamic in the real version*/}
      {props.flowCharts.map((flowChart: FlowChart) => {
          return <Tabs.Trigger className={`${styles.TabsTrigger} w-52 p-1 text-left flex justify-between items-center border-r-2 border-inherit`} value={flowChart.value}>
          {flowChart.title}
          <div className='flex gap-x-2'>
          {flowChart.colaborators.map((user: User) => {
            return <AvatarComponent initials={user.initials} />
          })
          }
          <div><FlowTabsDropdown users={flowChart.colaborators} /></div>
          </div>

        </Tabs.Trigger>
        })
      }
      <TooltipComponent text="add new flow" buttonContent={<PlusIcon />} />
    </Tabs.List>
      {props.flowCharts.map((flowChart: FlowChart) => {
         return <Tabs.Content className={styles.TabsContent} value={flowChart.value}>
          <div className={styles.reactflowWrapper} ref={props.reactFlowWrapper}>
          <ReactFlow
            nodes={props.nodes}
            edges={props.edges}
            onNodesChange={props.onNodesChange}
            onEdgesChange={props.onEdgesChange}
            onConnect={props.onConnect}
            onInit={props.onInit}
            onDrop={props.onDrop}
            onDragOver={props.onDragOver}
            nodeTypes={props.nodeTypes}
            fitView>
            <Background variant={"dots" as BackgroundVariant} gap={12} size={1} />
            <Controls position="bottom-right" />
          </ReactFlow>

        {/* <Background variant="dots" gap={12} size={1} /> */}
        </div>
        </Tabs.Content>
      })
      }
    <NodeDialogComponent isOpen={isDialogOpen} onClose={setIsDialogOpen} />

  </Tabs.Root>
  </Context.Provider>

)
}

export default FlowTabs;