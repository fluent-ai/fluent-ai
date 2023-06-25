import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styles from './RadioGroupComponent.module.css';

interface option {
    value: string;
    label: string;
}

interface RadioGroupProps {
    defaultValue?: string;
    options: option[]
    onChange: (value: string) => void;
    areaLabel?: string;
    size?: 'small' | 'medium' | 'large';
}

const RadioGroup = ({defaultValue, options, onChange, areaLabel, size='medium'}:RadioGroupProps) => {
    if(!defaultValue) defaultValue = options[0].value;
    
    return (
        <form>
            <RadioGroupPrimitive.Root
                className={`${styles.RadioGroupRoot} ${styles[`size-${size}`]}`}
                defaultValue={defaultValue}
                aria-label={areaLabel}
                onValueChange={onChange}
            >
            {options.map((option) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <RadioGroupPrimitive.Item className={styles.RadioGroupItem} value={option.value} id={option.value}>
                <RadioGroupPrimitive.Indicator className={styles.RadioGroupIndicator} />
                </RadioGroupPrimitive.Item>
                <label className={styles.Label} htmlFor={option.value}>
                {option.label}
                </label>
                </div>
            ))}
            </RadioGroupPrimitive.Root>
        </form>
        )
    }

export default RadioGroup;