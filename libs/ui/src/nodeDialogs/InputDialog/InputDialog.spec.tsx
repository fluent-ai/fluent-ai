import { render } from '@testing-library/react';

import {InputDialog} from './InputDialog';

describe('InputDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputDialog
      id='test'
       />);
    expect(baseElement).toBeTruthy();
  });
});
