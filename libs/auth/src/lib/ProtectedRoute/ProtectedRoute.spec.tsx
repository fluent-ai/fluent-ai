import { render } from '@testing-library/react';

import ProtectedRoute from './ProtectedRoute';

describe('ProtectedRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProtectedRoute />);
    expect(baseElement).toBeTruthy();
  });
});
