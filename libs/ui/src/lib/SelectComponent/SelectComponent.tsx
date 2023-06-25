import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import styles from './SelectComponent.module.css';

interface SelectItemProps {
    label: string | JSX.Element; // The content of the component, which can be a string or a JSX element.
    className?: string; // The CSS class name for the component.
    value: string; // The value of the component.
    disabled?: boolean; // Whether the component is disabled.
  }

interface SelectProps {
  value?: string; // The value of the component.
  onChange?: (value: string) => void; // The callback to invoke when the value changes.  
  placeholder: string;
  options: SelectItemProps[];
}


const Select = ({value, onChange, options, placeholder} : SelectProps) => (
  <SelectPrimitive.Root onValueChange={onChange} value={value}>
    <SelectPrimitive.Trigger className={styles.SelectTrigger} aria-label={placeholder}>
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon className={styles.SelectIcon}>
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={styles.SelectContent}>
        <SelectPrimitive.ScrollUpButton className={styles.SelectScrollButton}>
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className={styles.SelectViewport}>
          <SelectPrimitive.Group>
            <SelectPrimitive.Label className={styles.SelectLabel}>{placeholder}</SelectPrimitive.Label>
            {options.map((option) => (
                <SelectItem value={option.value} label={option.label}/>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className={styles.SelectScrollButton}>
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);


const SelectItem = React.forwardRef((
    { label, className, ...props }
    :SelectItemProps, forwardedRef: React.Ref<HTMLDivElement>) => {
  return (
    <SelectPrimitive.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
      <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={styles.SelectItemIndicator}>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

export default Select;