import { render } from '@testing-library/react';

import FormField from './FormFieldComponent';

describe('FormField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <FormField
      label="test input"
      onChange={()=>{console.log('hello')}}
      type="text"
     />);
    expect(baseElement).toBeTruthy();
  });
});
