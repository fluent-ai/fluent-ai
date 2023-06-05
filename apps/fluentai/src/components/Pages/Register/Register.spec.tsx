import { render } from '@testing-library/react';

import Register from './Register';

describe('Register', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Register />);
    expect(baseElement).toBeTruthy();
  });
});
