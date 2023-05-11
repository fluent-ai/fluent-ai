/* eslint-disable-next-line */
import * as Form from '@radix-ui/react-form';
import { SetStateAction, Dispatch } from 'react';
export interface Validation {
  match: "badInput" | "patternMismatch" | "rangeOverflow" | "rangeUnderflow" | "stepMismatch" | "tooLong" | "tooShort" | "typeMismatch" | "valid" | "valueMissing" | Form.CustomMatcher | undefined,
  message: string
}

export interface FormFieldProps {
  label: string
  validations?: Validation[],
  type:string,
  required?: boolean,
  value?: any,
  onChange: any,
  placeholder?:string
}

function FormFieldComponent (props: FormFieldProps) {
  return (
    <Form.Field className="grid mb-[10px]" name="password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="">{props.label}</Form.Label>
        {props.validations?.map((validation:Validation) => <Form.Message className="" match={validation.match}>
          {validation.message}
        </Form.Message>
        )}
      </div>
      <Form.Control asChild>
        <input
          className="border-2 border-solid border-inherit rounded-md text-black h-9"
          type={props.type}
          required={props.required}
          value={props.value}
          onChange={(e)=>props.onChange(e)}
          placeholder={props.placeholder}
        />
      </Form.Control>
    </Form.Field>
  );
}

export {FormFieldComponent};
