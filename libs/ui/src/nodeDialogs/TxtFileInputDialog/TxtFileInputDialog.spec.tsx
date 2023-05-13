import { render } from '@testing-library/react';

import {TxtFileInputDialog} from './TxtFileInputDialog';

describe('TxtFileInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TxtFileInputDialog
      isOpen={true}
      onClose={()=>{console.log('onClose')}}
      activeDialog='txtFile'
      nodes={[]}
      setNodes={()=>console.log('setNodes')}
      activeNodeId='test'
       />);
    expect(baseElement).toBeTruthy();
  });
});
