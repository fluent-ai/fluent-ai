import { User } from './types';
export const mockUser: User = {
  id: 'testId',
  email: 'test@test.com',
  name: 'Jeff Bezos',
  initials: 'JB',
  flows: ['testId-1'],
  profileImg:
    'https://lh3.googleusercontent.com/a/AGNmyxbYjdO34l9YBDRRFclrO7qM3cjlmxQY6F9eZ4w_Qw=s96-c',
};

export const mockFlow = {
  id: 'testId-1',
  title: 'My Flow 1',
  ownerId: 'testId',
  stringifiedNodes: '[]',
  stringifiedEdges: '[]',
  collaboratorIds: ['testId'],
  collaborators: [
    {
      id: 'testId',
      name: 'Jeff Bezos',
      initials: 'JB',
    },
  ],
};
