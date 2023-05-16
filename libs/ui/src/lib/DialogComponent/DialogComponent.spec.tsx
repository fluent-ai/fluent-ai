import { render } from '@testing-library/react';

import {DialogComponent} from './DialogComponent';

describe('DialogComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DialogComponent />);
    expect(baseElement).toBeTruthy();
  });
});
