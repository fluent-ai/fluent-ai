import React from 'react';
import NodeItemSideBar from '../NodeItemSideBar/NodeItemSideBar';
// <<<<<<< HEAD
import {
  PlayIcon,
  LapTimerIcon,
} from '@radix-ui/react-icons';
import { SettingsDialog, LoadDialog } from '@tool-ai/ui';

import { NodeData } from '../../../nodeData';
import { flowRunnerSelectors } from '@tool-ai/state';
import { useSelector } from 'react-redux';

const NodeSideBar = ({ runFlow }: { runFlow: () => void }) => {
  const state = useSelector(flowRunnerSelectors.selectStatus);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex absolute z-10 h-min top-20 left-2.5 group">
      <style>{`.scroll-container::-webkit-scrollbar { display: none; }`}</style>
      <aside
        className={`scroll-container px-2 py-2.5 max-h-[80vh] overflow-y-scroll rounded-md bg-white shadow-md w-[50px] overflow-x-hidden transition-all duration-300 ease-in-out group-hover:w-60`}
      >
        <SettingsDialog />
        <LoadDialog />
        <div className="flex gap-x-3" onClick={runFlow}>
          <div className="sidebar-icon">
            {state !== 'running' ? <PlayIcon /> : <LapTimerIcon />}
          </div>
          <p className="w-100" aria-label="settings" placeholder="Search nodes">
            Run
          </p>
        </div>
        {NodeData.map((nodeItem) => {
          return (
            <NodeItemSideBar
              key={nodeItem.type}
              onDragStartHandler={(event) => onDragStart(event, nodeItem.type)}
              title={nodeItem.label}
              icon={nodeItem.icon}
              group={nodeItem.group}
            />
          );
        })}
      </aside>
    </div>
  );
};

export default NodeSideBar;
