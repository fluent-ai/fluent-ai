import { render } from '@testing-library/react';

import {PreviewDialog} from './PreviewDialog';

describe('PreviewDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PreviewDialog
      id='test' />);
    expect(baseElement).toBeTruthy();
  });
});
