import { render } from '@testing-library/react';

import {FormFieldComponent} from './FormFieldComponent';

describe('FormField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <FormFieldComponent
      label="test input"
      onChange={()=>{console.log('hello')}}
      type="text"
     />);
    expect(baseElement).toBeTruthy();
  });
});
