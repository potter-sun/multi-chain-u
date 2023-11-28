import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import styles from './styles.module.scss';

export default function FormTextarea(props: TextAreaProps) {
  return (
    <div className={styles['textarea-wrapper']}>
      <Input.TextArea autoSize {...props} bordered={false} />
    </div>
  );
}
