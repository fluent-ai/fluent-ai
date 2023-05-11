import { render } from '@testing-library/react';

import AvatarComponent from './AvatarComponent';

describe('AvatarComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AvatarComponent initials="AP" />);
    expect(baseElement).toBeTruthy();
  });
});
