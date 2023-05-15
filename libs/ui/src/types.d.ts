import { ReactElement } from "react";

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
  data: any;
  isDialogOpen: boolean;
  setIsDialogOpen: (arg: boolean) => void;
}

export interface TooltipProps {
  buttonContent?: JSX.Element | string;
  text: string;
  name?: string;
  clickHandler?: () => void;
  classes?: string;
  children?: JSX.Element
}

export interface ButtonProps {
  buttonContent?: string | JSX.Element | undefined ,
  type: "button" | "submit" | "reset" | undefined;
  ariaLabel: string;
  classes?: string;
  clickHandler?: () => void | undefined;
}

interface NodeDialogProps {
  isOpen: boolean;
  onClose: (boolean: boolean) => void;
  activeDialog: string;
  nodes: Node<{ label: string }, string | undefined>[];
  setNodes: any;
  activeNodeId: string;
}
interface FlowCollaborators {
  id: string;
  name: string;
  initials: string;
}
interface UserFlows {
  id: string;
  title: string;
  stringifiedNodes: string;
  stringifiedEdges: string;
  owner: boolean;
  colaborators: FlowCollaborators[];
}

interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  flows: UserFlows[];
  profileImg?: string;
}

interface FlowTabsDropdownProps {
  users: FlowCollaborators[];
  onSave: () => void;
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
