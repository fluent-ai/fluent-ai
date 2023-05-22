import { render } from '@testing-library/react';

import {DownloadDialog} from './DownloadDialog';

describe('DownloadDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DownloadDialog
      id='test'
       />);
    expect(baseElement).toBeTruthy();
  });
});
