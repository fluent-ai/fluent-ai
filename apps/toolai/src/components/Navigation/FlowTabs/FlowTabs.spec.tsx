import { render } from '@testing-library/react';

import FlowTabs from './FlowTabs';

describe('FlowTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlowTabs />);
    expect(baseElement).toBeTruthy();
  });
});
