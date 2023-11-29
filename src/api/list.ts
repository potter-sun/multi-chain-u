// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { API_REQ_FUNCTION } from './types';

export const DEFAULT_METHOD = 'GET';

/**
 * api request configuration directory
 * @example
 *    upload: {
 *      target: '/api/file-management/file-descriptor/upload',
 *      baseConfig: { method: 'POST', },
 *    },
 * or:
 *    upload:'/api/file-management/file-descriptor/upload'
 *
 * @description api configuration default method is from DEFAULT_METHOD
 * @type {UrlObj}  // The type of this object from UrlObj.
 */

const AuthList = {
  token: {
    target: '/connect/token',
    baseConfig: { method: 'POST' },
  },
};

const DepositApiList = {
  getTokenList: '/api/etrans/token/list',
  getNetworkList: '/api/etrans/network/list',
  getDepositInfo: '/api/etrans/deposit/info',
  getWithdrawInfo: '/api/etrans/withdraw/info',
  createWithdrawOrder: {
    target: '/api/etrans/withdraw/order',
    baseConfig: { method: 'POST' },
  },
};

/**
 * api request extension configuration directory
 * @description object.key // The type of this object key comes from from @type {UrlObj}
 */
export const EXPAND_APIS = { deposit: DepositApiList, auth: AuthList };

export type EXPAND_REQ_TYPES = {
  [X in keyof typeof EXPAND_APIS]: {
    [K in keyof (typeof EXPAND_APIS)[X]]: API_REQ_FUNCTION;
  };
};
