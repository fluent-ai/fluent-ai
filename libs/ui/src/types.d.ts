export interface Validation {
  match:
    | 'badInput'
    | 'patternMismatch'
    | 'rangeOverflow'
    | 'rangeUnderflow'
    | 'stepMismatch'
    | 'tooLong'
    | 'tooShort'
    | 'typeMismatch'
    | 'valid'
    | 'valueMissing'
    | Form.CustomMatcher
    | undefined;
  message: string;
}

export interface FormFieldProps {
  label: string;
  validations?: Validation[];
  type: string;
  required?: boolean;
  value?: any;
  onChange: any;
  placeholder?: string;
}

export interface NodeWrapperComponentProps {
  isConnectable: boolean;
  data: any,
  isDialogOpen: boolean;
  setIsDialogOpen: (arg: boolean) => void;
}

interface TooltipProps {
  buttonContent?: JSX.Element | string;
  text: string;
}

interface NodeDialogProps {
  isOpen: boolean;
  onClose: (boolean: boolean) => void;
  activeDialog: string;
}

interface User {
  id: string;
  initials: string;
  name?: string;
  url?: string;
  alt?: string;
}

interface FlowTabsDropdownProps {
  users: User[];
}

interface AvatarProps {
  initials: string;
  name?: string;
  url?: string;
  alt?: string;
}

interface AlertProps {
  buttonText: string;
  title?: string;
  description?: string;
  classes?: string;
}
