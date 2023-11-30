import { useCallback, useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { LoadingInfoType } from '@portkey/did-ui-react';
import { setLoading } from 'aelf-web-login';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCommon = () => useAppSelector((state) => state.common);
export const usePortkeyWallet = () => useAppSelector((state) => state.portkeyWallet);

export const useLoading = () => {
  const _setLoading = useCallback(
    (isLoading: boolean | number, loadingInfo?: LoadingInfoType) =>
      setLoading(isLoading, loadingInfo),
    [],
  );
  return useMemo(() => ({ setLoading: _setLoading }), [_setLoading]);
};
