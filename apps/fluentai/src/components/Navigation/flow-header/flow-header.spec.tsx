import { render } from '@testing-library/react';

import FlowHeader from './flow-header';

describe('FlowHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlowHeader />);
    expect(baseElement).toBeTruthy();
  });
});
