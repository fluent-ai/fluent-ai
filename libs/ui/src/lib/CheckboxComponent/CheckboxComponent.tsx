import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import styles from './CheckboxComponent.module.css';
import { CSSProperties, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  customStyles?: CSSProperties & { '--highlight': string };
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Checkbox = ({
  label,
  checked,
  onCheckedChange,
  customStyles,
  size,
  disabled,
}: CheckboxProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState<string>(`switch-${uuid()}`);

  return (
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CheckboxPrimitive.Root
          className={styles.CheckboxRoot}
          defaultChecked
          disabled={disabled}
          checked={checked}
          onCheckedChange={onCheckedChange}
          id={id}
          style={customStyles}
        >
          <CheckboxPrimitive.Indicator className={styles.CheckboxIndicator}>
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label className={styles.Label} htmlFor={id}>
          {label}
        </label>
      </div>
    </form>
  );
};

export default Checkbox;
