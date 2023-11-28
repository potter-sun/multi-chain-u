import { InputNumber, InputNumberProps } from 'antd';
import styles from './styles.module.scss';

type ValueType = string | number;

export default function FormInputNumber<T extends ValueType>(props: InputNumberProps<T>) {
  return (
    <div>
      <InputNumber controls={false} precision={0} {...props} className={styles['input-number']} />
    </div>
  );
}
