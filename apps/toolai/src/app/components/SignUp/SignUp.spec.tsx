import { render } from '@testing-library/react';

import SignUp from './SignUp';

describe('SignUp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignUp />);
    expect(baseElement).toBeTruthy();
  });
});
