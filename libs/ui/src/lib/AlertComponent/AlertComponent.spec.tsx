import { render } from '@testing-library/react';

import {AlertComponent} from './AlertComponent';

describe('AlertComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AlertComponent buttonText='' />);
    expect(baseElement).toBeTruthy();
  });
});
