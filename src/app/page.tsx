'use client';
import { Button } from 'antd';
import clsx from 'clsx';
// import { useEffect } from 'react';
import Content from 'pageComponents/Content';
import { usePortkeyProvider } from 'hooks/usePortkeyProvider';
import { usePortkeyWallet } from 'store/Provider/hooks';
import styles from 'styles/pages/home.module.scss';

export default function Home() {
  const portkeyWallet = usePortkeyWallet();
  const { activate } = usePortkeyProvider();

  //   const { callViewMethod } = useCallContract();
  //   useEffect(() => {
  //     callViewMethod({
  //       contractAddress: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
  //       methodName: 'GetBalance',
  //       args: {
  //         symbol: 'ELF',
  //         owner: 'oTbTFJ6LyUDnJfkv13hpqHMVmTjQ417n78SiUpUUGC4672VFy', // owner caAddress
  //       },
  //     }).then((res) => {
  //       console.log('🌈 🌈 🌈 🌈 🌈 🌈 balance: ', res);
  //     });
  //   }, [callViewMethod]);

  return (
    <div className={styles['content-wrapper']}>
      <Content />
    </div>
    // <div className={clsx('flex-row-center-between', styles.homePage)}>
    //   <Button type="primary" onClick={activate}>
    //     connect wallet
    //   </Button>
    //   <h2>{portkeyWallet.name}</h2>
    // </div>
  );
}
