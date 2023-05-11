import { render } from '@testing-library/react';

import {InputDialog} from './InputDialog';

describe('InputDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputDialog
      isOpen={true}
      onClose={()=>{console.log('onClose')}}
      activeDialog='input'
      nodes={[]}
      setNodes={()=>console.log('setNodes')}
      activeNodeId='test'
       />);
    expect(baseElement).toBeTruthy();
  });
});
