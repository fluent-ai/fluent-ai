import { render } from '@testing-library/react';

import NodeSideBar from './NodeSideBar';

describe('NodeSideBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NodeSideBar />);
    expect(baseElement).toBeTruthy();
  });
});
