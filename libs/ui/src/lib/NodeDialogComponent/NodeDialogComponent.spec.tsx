import { render } from '@testing-library/react';

import {NodeDialogComponent} from './NodeDialogComponent';

describe('NodeDialogComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NodeDialogComponent
      isOpen={true}
      onClose={()=>{console.log(false)}} />);
    expect(baseElement).toBeTruthy();
  });
});
