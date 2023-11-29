import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import styles from './styles.module.scss';

const { TextArea } = Input;

interface FormTextareaProps {
  textareaProps?: Omit<TextAreaProps, 'value' | 'onChange'>;
  value?: string;
  onChange?: (value: string | null) => void;
}

export default function FormTextarea({ textareaProps, value, onChange }: FormTextareaProps) {
  return (
    <div className={styles['textarea-wrapper']}>
      <TextArea
        autoSize
        {...textareaProps}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        bordered={false}
      />
    </div>
  );
}
