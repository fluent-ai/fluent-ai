import { render } from '@testing-library/react';

import {NodeDialogComponent} from './NodeDialogComponent';

describe('NodeDialogComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NodeDialogComponent
      isOpen={true}
      onClose={()=>{console.log('onClose')}}
      activeDialog='nodedialog'
      nodes={[]}
      setNodes={()=>console.log('setNodes')}
      activeNodeId='test' />);
    expect(baseElement).toBeTruthy();
  });
});
