import { render } from '@testing-library/react';

import {TextFileInputDialog} from './TextFileInputDialog';

describe('TextFileInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextFileInputDialog
      id='test'
       />);
    expect(baseElement).toBeTruthy();
  });
});
