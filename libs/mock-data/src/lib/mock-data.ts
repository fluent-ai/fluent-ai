import * as types from '@libs/custom-types';

export const client: types.Client = {
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
  profileImg: '',
};

export const mockNodes: types.FlowNode = {
  id: '1',
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
