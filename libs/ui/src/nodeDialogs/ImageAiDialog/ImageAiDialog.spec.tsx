import { render } from '@testing-library/react';

import ImageAiDialog from './ImageAiDialog';

describe('ImageAiDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageAiDialog />);
    expect(baseElement).toBeTruthy();
  });
});
