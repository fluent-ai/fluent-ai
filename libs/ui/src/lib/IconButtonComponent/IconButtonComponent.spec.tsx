import { render } from '@testing-library/react';

import IconButtonComponent from './IconButtonComponent';

describe('IconButtonComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconButtonComponent />);
    expect(baseElement).toBeTruthy();
  });
});
