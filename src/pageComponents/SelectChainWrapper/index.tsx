import clsx from 'clsx';
import SelectChain from 'components/SelectChain';
import { useCommon } from 'store/Provider/hooks';
import styles from './styles.module.scss';

interface SelectChainWrapperProps {
  className?: string;
  mobileLabel?: string;
  webLabel?: string;
}

export default function SelectChainWrapper({
  className,
  mobileLabel,
  webLabel,
}: SelectChainWrapperProps) {
  const { isMobilePX } = useCommon();
  return (
    <div className={clsx(styles['select-chain-wrapper'], className)}>
      <span className={styles['select-chain-label']}>{isMobilePX ? mobileLabel : webLabel}</span>
      <SelectChain />
    </div>
  );
}
