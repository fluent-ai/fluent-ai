import { render } from '@testing-library/react';

import {TextFileInputDialog} from './TextFileInputDialog';

describe('TextFileInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextFileInputDialog
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
