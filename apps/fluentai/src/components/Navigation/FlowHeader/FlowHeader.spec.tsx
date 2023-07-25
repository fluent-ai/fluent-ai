import { render } from '@testing-library/react';

import FlowHeader from './FlowHeader';

describe('FlowHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlowHeader />);
    expect(baseElement).toBeTruthy();
  });
});
