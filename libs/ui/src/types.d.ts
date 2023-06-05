import { ReactElement } from 'react';
import React from 'react';

export interface IValidation {
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

export interface IFormFieldProps {
  label: string;
  validations?: Validation[];
  type: string;
  required?: boolean;
  value?: string;
  onChange: any;
  placeholder?: string;
}

export interface INodeWrapperComponentProps {
  isConnectable: boolean;
  data: { label: string };
  isDialogOpen: boolean;
  setIsDialogOpen: (arg: boolean) => void;
}

export interface ITooltipProps {
  buttonContent?: JSX.Element | string;
  text: string;
  name?: string;
  clickHandler?: () => void;
  classes?: string;
  children?: JSX.Element;
}

export interface IButtonProps {
  buttonContent?: string | JSX.Element | undefined;
  type: 'button' | 'submit' | 'reset' | undefined;
  ariaLabel: string;
  classes?: string;
  clickHandler?: () => void | undefined;
  style?: any;
}

interface INodeDialogProps {
  isOpen: boolean;
  onClose: (boolean: boolean) => void;
  activeDialog: string;
  nodes: Node<{ label: string }, string | undefined>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<string | undefined>[]>>;
  activeNodeId: string;
}

interface IFlow {
  id: string;
  title: string;
  ownerId: string;
  stringifiedNodes: string;
  stringifiedEdges: string;
  collaboratorIds: string[];
  collaborators: FlowCollaborator[];
}

interface IUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  flows: string[];
  profileImg?: string;
}

interface IAvatarProps {
  initials: string;
  name?: string;
  url?: string;
  alt?: string;
}

interface IAlertProps {
  buttonText: string;
  title?: string;
  description?: string;
  classes?: string;
}
