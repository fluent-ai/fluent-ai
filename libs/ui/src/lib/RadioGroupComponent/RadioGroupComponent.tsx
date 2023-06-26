import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styles from './RadioGroupComponent.module.css';
import { CSSProperties } from 'react';

interface option {
    value: string;
    label: string  | JSX.Element;
    description?: string | JSX.Element;
}

interface RadioGroupProps {
    title?: string;
    defaultValue?: string;
    value?: string;
    options: option[]
    onChange: (value: string) => void;
    areaLabel?: string;
    size?: 'small' | 'medium' | 'large';
    customStyles?: CSSProperties & { '--highlight': string };

}

const RadioGroup = ({value, defaultValue, options, onChange, areaLabel, size='medium', title, customStyles}:RadioGroupProps) => {
    if(!defaultValue) defaultValue = options[0].value;
    
    return (
        <form>
            {title && <div className={styles.RadioGroupTitle}>{title}</div>}
            <RadioGroupPrimitive.Root
            style={customStyles}
            
  
                className={`${styles.RadioGroupRoot} ${styles[`size-${size}`]}`}
                {...(value && {value})}
                {...(!value && defaultValue && {defaultValue})}
                aria-label={areaLabel}
                onValueChange={onChange}
            >
            {options.map((option) => (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <RadioGroupPrimitive.Item className={styles.RadioGroupItem} value={option.value} id={option.value}>
                        <RadioGroupPrimitive.Indicator className={styles.RadioGroupIndicator} />
                        </RadioGroupPrimitive.Item>
                        <label className={styles.Label} htmlFor={option.value}>
                        {option.label}
                        </label>
                    </div>
                    {option.description && <div className={styles.Description}>{option.description}</div>}
                </div>
                
            ))}
            </RadioGroupPrimitive.Root>
        </form>
        )
    }

export default RadioGroup;