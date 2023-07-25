import { render } from '@testing-library/react';

import {DalleVariationDialog} from './DalleVariationDialog';

describe('ImageAiDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DalleVariationDialog
      id='test'
       />);
    expect(baseElement).toBeTruthy();
  });
});
