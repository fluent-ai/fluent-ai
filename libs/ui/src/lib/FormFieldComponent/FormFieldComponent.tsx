/* eslint-disable-next-line */
import * as Form from '@radix-ui/react-form';
import { SetStateAction, Dispatch } from 'react';
import { FormFieldProps, Validation } from '../../types';

function FormFieldComponent(props: FormFieldProps) {
  return (
    <Form.Field className="relative grid mb-[10px]" name="password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="">{props.label}</Form.Label>
        {props.validations?.map((validation: Validation) => (
          <Form.Message className="" match={validation.match}>
            {validation.message}
          </Form.Message>
        ))}
      </div>
      <Form.Control asChild>
        <input
          className="border-1 border-solid p-1 h-8 w-ful border-gray-light rounded-md text-black "
          type={props.type}
          required={props.required}
          value={props.value}
          //TODO: Fix this up julien
          onChange={(e)=>props.onChange(e)}
          placeholder={props.placeholder}
        />
      </Form.Control>
    </Form.Field>
  );
}

export { FormFieldComponent };
