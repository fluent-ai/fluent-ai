import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  TooltipComponent,
  FlowTabsDropdown,
  AvatarComponent,
  NodeDialogComponent,
  Flow,
  FlowCollaborator,
  saveFlow,
} from '@tool-ai/ui';
import { addFlowTab } from '@tool-ai/ui';
import { mock } from 'node:test';
import Context from '../../context/context';
import { IconButtonComponent } from '@tool-ai/ui';

interface FlowTabsProps {
  currentUserId: string;
  flowCharts: Flow[];
  reactFlowWrapper: any;
  nodes: Node<{ label: string }, string | undefined>[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  setNodes: any;
  onConnect: (params: any) => void;
  onInit: any;
  onDrop: any;
  onDragOver: any;
  nodeTypes: any;
  onTabChange: (id: string) => void;
}

const FlowTabs = (props: FlowTabsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState('');
  const [activeNodeId, setActiveNodeId] = useState('');

  const handleSave = function () {
    saveFlow(props.nodes, props.edges);
  };

  console.log(props.flowCharts);
  return (
    <Context.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
        setActiveDialog,
        setActiveNodeId,
      }}
    >

      {props.flowCharts && (
      <Tabs.Root className="flex flex-col" defaultValue={props.flowCharts[0] ? props.flowCharts[0].id : 'tab1'}>
        <Tabs.List
          className="absolute min-h-10 max-w-[50vw] overflow-x-scroll mt-2.5 mr-2.5 z-10 bg-white w-50 rounded-md shadow-md
          right-0 flex items-center"
          aria-label="Flow Tabs"
        >
          <div className="max-w-[45vw] flex items-center overflow-x-auto">
            {/* {props.flowCharts.length > 0 && props.flowCharts.map((flowChart: UserFlows) => { */}
            {props.flowCharts.map((flowChart: Flow) => {
              return (
                <Tabs.Trigger
                  className={`tabs-trigger w-52 p-2.5 text-left flex justify-between items-center border-r-2 border-inherit`}
                  value={flowChart.id}
                  onClick={() => props.onTabChange(flowChart.id)}
                >
                  <p className="whitespace-nowrap">{flowChart.title}</p>
                  <div className="flex gap-x-2 items-center">
                    {flowChart.collaborators.map(
                      (collaborator: FlowCollaborator) => {
                        if (collaborator.id !== props.currentUserId) {
                          return (
                            <AvatarComponent initials={collaborator.initials} />
                          );
                        } else {
                          return null;
                        }
                      }
                    )}
                    <div className="flex items-center">
                      <FlowTabsDropdown
                        flowChartOwner={flowChart.ownerId}
                        users={flowChart.collaborators}
                        onSave={handleSave}
                      />
                    </div>
                  </div>
                </Tabs.Trigger>
              );
            })}
          </div>

          <TooltipComponent text="add new flow" name="add-flow">
            <IconButtonComponent
              buttonContent={<PlusIcon />}
              type="button"
              ariaLabel="iconbutton"
              classes={'group-hover:bg-blue-50'}
              clickHandler={addFlowTab}
            />
          </TooltipComponent>
        </Tabs.List>

        {props.flowCharts.map((flowChart: Flow) => {
          return (
            <Tabs.Content value={flowChart.id}>
              {/*The div wrapping a flow must
              have a set height and width*/}
              <div
                className="flex-grow h-screen w-screen realtive z-0"
                ref={props.reactFlowWrapper}
              >
                <ReactFlow
                  nodes={props.nodes}
                  edges={props.edges}
                  onNodesChange={props.onNodesChange}
                  onEdgesChange={props.onEdgesChange}
                  onConnect={props.onConnect}
                  onInit={props.onInit}
                  onDrop={props.onDrop}
                  selectionOnDrag
                  onDragOver={props.onDragOver}
                  nodeTypes={props.nodeTypes}
                  fitView
                  defaultViewport={{ x: 0, y: 0, zoom: -5 }}
                >
                  <Background
                    variant={'dots' as BackgroundVariant}
                    gap={12}
                    size={1}
                  />
                  <Controls position="bottom-right" />
                </ReactFlow>

                {/* <Background variant="dots" gap={12} size={1} /> */}
              </div>
            </Tabs.Content>
          );
        })}
        <NodeDialogComponent
          isOpen={isDialogOpen}
          onClose={setIsDialogOpen}
          activeDialog={activeDialog}
          nodes={props.nodes}
          setNodes={props.setNodes}
          activeNodeId={activeNodeId}
        />
      </Tabs.Root>
      )}
    </Context.Provider>
  );
};

export default FlowTabs;
