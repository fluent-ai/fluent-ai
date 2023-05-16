import { render } from '@testing-library/react';

import DalleGenerationDialog from './DalleGenerationDialog';

describe('DalleGenerationDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DalleGenerationDialog />);
    expect(baseElement).toBeTruthy();
  });
});
