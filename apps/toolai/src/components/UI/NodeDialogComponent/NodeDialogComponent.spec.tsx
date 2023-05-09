import { render } from '@testing-library/react';

import NodeDialogComponent from './NodeDialogComponent';

describe('NodeDialogComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NodeDialogComponent />);
    expect(baseElement).toBeTruthy();
  });
});
