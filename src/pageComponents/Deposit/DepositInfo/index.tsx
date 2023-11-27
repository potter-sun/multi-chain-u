import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

const INFO_LIST = [
  {
    title: 'Minimum Deposit',
    value: 'More than 1.23 USDT',
  },
  {
    title: 'Contract Address',
    value: '0xc2132D05D31c914a87C66C10748AEb04B58e8F',
    link: 'https://www.baidu.com/',
  },
];

export default function DepositInfo() {
  return (
    <div className={'flex-column'}>
      {INFO_LIST.map((item) => (
        <div className={clsx('flex', styles['info-line'])} key={item.title}>
          <div className={clsx('flex-none', styles['info-title'])}>{item.title}</div>
          <div
            className={clsx('text-right', styles['info-value'], {
              [styles['info-value-underline']]: !!item.link,
            })}
            onClick={() => {
              if (item.link) {
                window.open(item.link, '_blank');
              }
            }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
