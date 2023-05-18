import { render } from '@testing-library/react';

import {UserFunctionDialog} from './UserFunctionDialog';

describe('UserFunctionDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <UserFunctionDialog
    id='test'  />
      );
    expect(baseElement).toBeTruthy();
  });
});
