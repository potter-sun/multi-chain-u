'use client';
import { useCallContract } from 'aelf-web-login';
import { useEffect } from 'react';

export default function Home() {
  const { callViewMethod } = useCallContract();

  useEffect(() => {
    callViewMethod({
      contractAddress: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
      methodName: 'GetBalance',
      args: {
        symbol: 'ELF',
        owner: 'oTbTFJ6LyUDnJfkv13hpqHMVmTjQ417n78SiUpUUGC4672VFy', // owner caAddress
      },
    }).then((res) => {
      console.log('🌈 🌈 🌈 🌈 🌈 🌈 balance: ', res);
    });
  }, []);

  return (
    <div className="flex">
      <p>home</p>
    </div>
  );
}
