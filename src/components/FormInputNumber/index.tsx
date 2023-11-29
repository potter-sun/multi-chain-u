import { InputNumber, InputNumberProps } from 'antd';
import clsx from 'clsx';
import styles from './styles.module.scss';

type ValueType = string | number;

interface FormInputNumberProps<T extends ValueType> {
  unit?: string;
  maxButtonConfig?: {
    onClick: () => void;
  };
  inputNumberProps?: Omit<InputNumberProps<T>, 'value' | 'onChange'>;
  value?: T;
  onChange?: (value: T | null) => void;
}

export default function FormInputNumber<T extends ValueType>({
  unit,
  maxButtonConfig,
  value,
  onChange,
  inputNumberProps,
  ...props
}: FormInputNumberProps<T>) {
  return (
    <div className={clsx('flex-row-center', styles['input-number-wrapper'])}>
      <InputNumber
        {...props}
        controls={false}
        precision={0}
        {...inputNumberProps}
        className={styles['input-number']}
        bordered={false}
        value={value}
        onChange={(data) => onChange?.(data)}
      />
      <div className={clsx('flex-none', 'flex-row-center', styles['input-number-addon-after'])}>
        {unit && <div className={styles['unit']}>{unit}</div>}
        {maxButtonConfig && (
          <div className={clsx('cursor-pointer', styles['max'])} onClick={maxButtonConfig.onClick}>
            Max
          </div>
        )}
      </div>
    </div>
  );
}
