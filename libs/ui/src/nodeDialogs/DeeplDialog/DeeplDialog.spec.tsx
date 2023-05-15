import { render } from '@testing-library/react';

import {DeeplDialog} from './DeeplDialog';

describe('DeeplDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeeplDialog />);
    expect(baseElement).toBeTruthy();
  });
});
