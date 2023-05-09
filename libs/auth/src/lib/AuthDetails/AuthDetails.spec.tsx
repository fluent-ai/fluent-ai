import { render } from '@testing-library/react';

import AuthDetails from './AuthDetails';

describe('AuthDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthDetails />);
    expect(baseElement).toBeTruthy();
  });
});
