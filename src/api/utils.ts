import axios from 'axios';
import { BaseConfig, RequestConfig } from './types';
import { stringify } from 'query-string';
import { LocalStorageKey } from 'constants/localStorage';
import { ETransHost } from 'constants/testnet';

export function spliceUrl(baseUrl: string, extendArg?: string) {
  return extendArg ? baseUrl + '/' + extendArg : baseUrl;
}

export function getRequestConfig(base: BaseConfig, config?: RequestConfig) {
  if (typeof base === 'string') {
    return config;
  } else {
    const { baseConfig } = base || {};
    const { query, method, params, data } = config || {};
    return {
      ...config,
      ...baseConfig,
      query: (baseConfig.query || '') + (query || ''),
      method: method ? method : baseConfig.method,
      params: Object.assign({}, baseConfig.params, params),
      data: Object.assign({}, baseConfig.data, data),
    };
  }
}

type QueryAuthorizationBaseConfig = {
  grant_type: string;
  scope: string;
  client_id: string;
};
type QueryAuthorizationExtraRequest = {
  pubkey: string;
  signature: string;
  plain_text: string;
  ca_hash: string;
  chain_id: string;
};
const queryAuthorizationBaseConfig: QueryAuthorizationBaseConfig = {
  grant_type: 'signature',
  scope: 'ETransServer',
  client_id: 'ETransServer_App',
};
export const queryAuthorization = async (config: QueryAuthorizationExtraRequest) => {
  const data = { ...queryAuthorizationBaseConfig, ...config };
  const { access_token, token_type }: any = await axios.post(
    `${ETransHost}/connect/token`,
    stringify(data),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  if (localStorage) {
    // set JWT info for localStorage
    localStorage?.setItem(LocalStorageKey.TOKEN_TYPE, token_type);
    localStorage?.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
  }

  // const { access_token, token_type } = await request.auth.token({
  //   baseURL: 'http://192.168.11.143:8089',
  //   data: qs.stringify(data),
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  // });
  return `${token_type} ${access_token}`;
};
