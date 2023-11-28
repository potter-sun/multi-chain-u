import { Input } from 'antd';
import styles from './styles.module.scss';

type FormInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function FormInput({ placeholder, value, onChange }: FormInputProps) {
  return (
    <div>
      <Input
        className={styles['input']}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
