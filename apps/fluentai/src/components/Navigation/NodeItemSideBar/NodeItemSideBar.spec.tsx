import { render } from '@testing-library/react';

import NodeItemSideBar from './NodeItemSideBar';

describe('NodeItemSideBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NodeItemSideBar />);
    expect(baseElement).toBeTruthy();
  });
});
