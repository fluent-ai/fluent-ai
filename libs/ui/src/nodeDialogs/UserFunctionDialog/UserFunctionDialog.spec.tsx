import { render } from '@testing-library/react';

import {UserFunctionDialog} from './UserFunctionDialog';

describe('UserFunctionDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <UserFunctionDialog
      isOpen={true}
      onClose={()=>{console.log('onClose')}}
      activeDialog='userFunction'
      nodes={[]}
      setNodes={()=>console.log('setNodes')}
      activeNodeId='test' />
      );
    expect(baseElement).toBeTruthy();
  });
});
