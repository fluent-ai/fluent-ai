import { render } from '@testing-library/react';

import {JsonDialog} from './JsonDialog';

describe('JsonDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JsonDialog
      id='test'
       />);
    expect(baseElement).toBeTruthy();
  });
});
