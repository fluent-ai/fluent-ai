import { render } from '@testing-library/react';

import NodeWrapperComponent from './NodeWrapperComponent';

describe('NodeWrapperComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NodeWrapperComponent />);
    expect(baseElement).toBeTruthy();
  });
});
