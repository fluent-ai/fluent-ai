import { User } from './types';
export const mockUser: User = {
  id: '1aUOgbQFrvWfdNj3zES1C1l8ofC3',
  email: 'julien@gmx.com',
  name: 'Julien Look',
  initials: 'JU',
  flows: ['1aUOgbQFrvWfdNj3zES1C1l8ofC3-1'],
  profileImg: '',
};

export const mockFlow = {
  id: '1aUOgbQFrvWfdNj3zES1C1l8ofC3-1',
  title: 'My Flow 1',
  ownerId: '1aUOgbQFrvWfdNj3zES1C1l8ofC3',
  stringifiedNodes: '[]',
  stringifiedEdges: '[]',
  collaboratorIds: ['1aUOgbQFrvWfdNj3zES1C1l8ofC3'],
  collaborators: [
    {
      id: '1aUOgbQFrvWfdNj3zES1C1l8ofC3',
      name: 'Julien Look',
      initials: 'JU',
    },
  ],
};
