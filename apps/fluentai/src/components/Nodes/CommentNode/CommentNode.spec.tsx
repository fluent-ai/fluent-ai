import { render } from '@testing-library/react';

import CommentNode from './CommentNode';

describe('CommentNode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentNode />);
    expect(baseElement).toBeTruthy();
  });
});
