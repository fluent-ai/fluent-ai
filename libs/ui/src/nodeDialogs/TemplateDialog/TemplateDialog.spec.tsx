import { render } from '@testing-library/react';

import TemplateDialog from './TemplateDialog';

describe('TemplateDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TemplateDialog />);
    expect(baseElement).toBeTruthy();
  });
});
