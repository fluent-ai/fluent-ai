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
  profileImg:
    'https://lh3.googleusercontent.com/a/AGNmyxbYjdO34l9YBDRRFclrO7qM3cjlmxQY6F9eZ4w_Qw=s96-c',
};
