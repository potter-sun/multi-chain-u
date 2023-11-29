import { useMemo } from 'react';
import { useCallContract } from 'aelf-web-login';

export const useBalances = (contractAddress: string, methodName: string, args: any) => {
  const { callViewMethod } = useCallContract();

  useMemo(() => {
    callViewMethod({
      contractAddress,
      methodName,
      args,
    });
  }, [args, callViewMethod, contractAddress, methodName]);
};
