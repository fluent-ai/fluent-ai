import { User } from './types';
export const mockClient: User = {
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
  profileImg: '',
};
