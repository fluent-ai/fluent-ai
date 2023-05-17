import { User } from './types';
export const mockUser: User = {
  id: 'testId_3',
  email: 'test@test.com',
  name: 'Jeff Bezos',
  initials: 'JB',
  flows: ['testId_3-1'],
  profileImg:
    'https://lh3.googleusercontent.com/a/AGNmyxbYjdO34l9YBDRRFclrO7qM3cjlmxQY6F9eZ4w_Qw=s96-c',
};

export const mockFlow = {
  id: 'testId_3-1',
  title: 'My Flow 1',
  ownerId: 'testId_3',
  stringifiedNodes: '[]',
  stringifiedEdges: '[]',
  collaboratorIds: ['testId_3'],
  collaborators: [
    {
      id: 'testId_3',
      name: 'Jeff Bezos',
      initials: 'JB',
    },
  ],
};
