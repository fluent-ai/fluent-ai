import { render } from '@testing-library/react';

import {ButtonComponent} from './ButtonComponent';

describe('ButtonComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ButtonComponent type="button" ariaLabel="test-button" />);
    expect(baseElement).toBeTruthy();
  });
});
