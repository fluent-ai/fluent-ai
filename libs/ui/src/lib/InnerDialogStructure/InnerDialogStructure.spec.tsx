import { render } from '@testing-library/react';

import {InnerDialogStructure} from './InnerDialogStructure';

describe('InnerDialogStructure', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InnerDialogStructure title='test Dialog' description='lorem ipsum'><p>test dialog</p></InnerDialogStructure>);
    expect(baseElement).toBeTruthy();
  });
});
