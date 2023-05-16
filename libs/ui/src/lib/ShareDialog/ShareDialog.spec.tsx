import { render } from '@testing-library/react';

import ShareDialog from './ShareDialog';

describe('ShareDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShareDialog />);
    expect(baseElement).toBeTruthy();
  });
});
