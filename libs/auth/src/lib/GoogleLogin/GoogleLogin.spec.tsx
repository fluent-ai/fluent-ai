import { render } from '@testing-library/react';

import GoogleLogin from './GoogleLogin';

describe('GoogleLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GoogleLogin />);
    expect(baseElement).toBeTruthy();
  });
});
