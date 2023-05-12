import { render } from '@testing-library/react';

import OpenAIDialog from './OpenAIDialog';

describe('OpenAIDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpenAIDialog />);
    expect(baseElement).toBeTruthy();
  });
});
