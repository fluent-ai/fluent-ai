import * as types from '@libs/custom-types';

export const client: types.Client = {
  id: 'testId',
  email: 'test@test.com',
  name: 'Jeff Bezos',
  initials: 'JB',
  flows: [
    {
      id: 'testId',
      stringifiedFlowData: 'flowPlaceHolder',
      owner: true,
    },
  ],
};

export const mockNodes: types.FlowNode = {
  id: 'testId',
  type: types.NodeType.Custom,
  stringifiedData: 'dataPlaceHolder',
  position: {
    x: 500,
    y: 500,
  },
};

export const mockEdge: types.FlowEdge = {
  id: 'e1-2',
  sourceId: '1',
  targetId: '2',
};
