import { CSSProperties, useState } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import style from './SwitchComponent.module.css';
import { v4 as uuid } from 'uuid';
import { CheckIcon } from '@radix-ui/react-icons';

interface SwitchProps {
  label: string;
  disabled?: boolean;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  customStyles?: CSSProperties & { '--highlight': string };
  size?: 'small' | 'medium' | 'large';
}

const Switch = ({
  label,
  checked,
  onCheckedChange,
  customStyles,
  size,
  disabled,
}: SwitchProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState<string>(`switch-${uuid()}`);

  return (
    <form>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          opacity: disabled ? '0.5' : '1',
        }}
      >
        <SwitchPrimitive.Root
          disabled={disabled}
          className={style.SwitchRoot}
          checked={checked}
          onCheckedChange={onCheckedChange}
          id={id}
          style={customStyles}
        >
          <SwitchPrimitive.Thumb className={style.SwitchThumb}>
            <CheckIcon className={style.SwitchCheckIcon} />
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
        <label
          className={style.Label}
          htmlFor={id}
          style={{ paddingRight: 15 }}
        >
          {label}
        </label>
      </div>
    </form>
  );
};

export default Switch;
