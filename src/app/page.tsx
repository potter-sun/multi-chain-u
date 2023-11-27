'use client';
// import { useCallContract } from 'aelf-web-login';
import clsx from 'clsx';
// import { useEffect } from 'react';
import Content from 'pageComponents/Content';
import styles from 'styles/pages/home.module.scss';

export default function Home() {
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
  );
}
