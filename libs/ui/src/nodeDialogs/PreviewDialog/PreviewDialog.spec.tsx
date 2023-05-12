import { render } from '@testing-library/react';

import {PreviewDialog} from './PreviewDialog';

describe('PreviewDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PreviewDialog
      isOpen={true}
      onClose={()=>{console.log('onClose')}}
      activeDialog='preview'
      nodes={[]}
      setNodes={()=>console.log('setNodes')}
      activeNodeId='test' />);
    expect(baseElement).toBeTruthy();
  });
});
