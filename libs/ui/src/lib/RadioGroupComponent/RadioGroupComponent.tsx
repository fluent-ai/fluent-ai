import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styles from './RadioGroupComponent.module.css';
import { CSSProperties, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface option {
  value: string;
  label: string | JSX.Element;
  description?: string | JSX.Element;
}

interface RadioGroupProps {
  title?: string;
  defaultValue?: string;
  value?: string;
  options: option[];
  onChange: (value: string) => void;
  areaLabel?: string;
  size?: 'small' | 'medium' | 'large';
  customStyles?: CSSProperties & { '--highlight': string };
}

const RadioGroup = ({
  value,
  defaultValue,
  options,
  onChange,
  areaLabel,
  size = 'medium',
  title,
  customStyles,
}: RadioGroupProps) => {
  const idRef = useRef(uuidv4());
  if (!defaultValue) defaultValue = options[0].value;

  return (
    <form>
      {title && <div className={styles.RadioGroupTitle}>{title}</div>}
      <RadioGroupPrimitive.Root
        style={customStyles}
        className={`${styles.RadioGroupRoot} ${styles[`size-${size}`]}`}
        {...(value && { value })}
        {...(!value && defaultValue && { defaultValue })}
        aria-label={areaLabel}
        onValueChange={onChange}
      >
        {options.map((option, index) => (
          <div key={`${idRef.current}-${option.value}`}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RadioGroupPrimitive.Item
                className={styles.RadioGroupItem}
                value={option.value}
                id={`${idRef.current}-${option.value}`}
              >
                <RadioGroupPrimitive.Indicator
                  className={styles.RadioGroupIndicator}
                />
              </RadioGroupPrimitive.Item>
              <label
                className={styles.Label}
                htmlFor={`${idRef.current}-${option.value}`}
              >
                {option.label}
              </label>
            </div>
            {option.description && (
              <div className={styles.Description}>{option.description}</div>
            )}
          </div>
        ))}
      </RadioGroupPrimitive.Root>
    </form>
  );
};

export default RadioGroup;
