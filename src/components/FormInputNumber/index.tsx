import { InputNumber, InputNumberProps } from 'antd';
import styles from './styles.module.scss';

type ValueType = string | number;

export default function FormInputNumber<T extends ValueType>(props: InputNumberProps<T>) {
  return (
    <div className={styles['input-number-wrapper']}>
      <InputNumber
        controls={false}
        precision={0}
        {...props}
        className={styles['input-number']}
        bordered={false}
      />
    </div>
  );
}
