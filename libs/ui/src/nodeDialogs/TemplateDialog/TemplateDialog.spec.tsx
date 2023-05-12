import { render } from '@testing-library/react';

import {TemplateDialog} from './TemplateDialog';

describe('TemplateDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <TemplateDialog
      isOpen={true}
      onClose={()=>{console.log('onClose')}}
      activeDialog='template'
      nodes={[]}
      setNodes={()=>console.log('setNodes')}
      activeNodeId='test' />
    );
    expect(baseElement).toBeTruthy();
  });
});
