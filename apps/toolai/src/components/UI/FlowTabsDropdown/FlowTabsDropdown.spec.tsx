import { render } from '@testing-library/react';

import FlowTabsDropdown from './FlowTabsDropdown';

describe('FlowTabsDropdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlowTabsDropdown />);
    expect(baseElement).toBeTruthy();
  });
});
