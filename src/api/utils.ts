import axios from 'axios';
import { BaseConfig, RequestConfig } from './types';
import { stringify } from 'query-string';
import { SupportedELFChainId } from 'constants/index';
import { LocalStorageKey } from 'constants/localStorage';
import { ETransHost } from 'constants/testnet';
import portkeyWalletProvider from 'provider/portkeyProvider';
import AElf from 'aelf-sdk';
import service from './axios';

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

type QueryAuthApiBaseConfig = {
  grant_type: string;
  scope: string;
  client_id: string;
};
type QueryAuthApiExtraRequest = {
  pubkey: string;
  signature: string;
  plain_text: string;
  ca_hash: string;
  chain_id: string;
};
const queryAuthApiBaseConfig: QueryAuthApiBaseConfig = {
  grant_type: 'signature',
  scope: 'ETransServer',
  client_id: 'ETransServer_App',
};
export const queryAuthApi = async (config: QueryAuthApiExtraRequest) => {
  const data = { ...queryAuthApiBaseConfig, ...config };
  const res = await axios.post<{ token_type: string; access_token: string }>(
    `${ETransHost}/connect/token`,
    stringify(data),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );
  const token_type = res.data.token_type;
  const access_token = res.data.access_token;

  service.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;

  if (localStorage) {
    // set JWT info for localStorage
    localStorage.setItem(LocalStorageKey.TOKEN_TYPE, token_type);
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
  }

  // const { access_token, token_type } = await request.auth.token({
  //   baseURL: 'http://192.168.11.143:8089',
  //   data: qs.stringify(data),
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  // });
  return `${token_type} ${access_token}`;
};

// const plainText = `Welcome to ETrans!

// Click to sign in. This request will not trigger a blockchain transaction or cost any transaction fees.

// Nonce:
// ${Date.now()}`;

const plainText = `Nonce:${Date.now()}`;
export const queryAuthToken = async (chainId: SupportedELFChainId) => {
  const plainTextHex = Buffer.from(plainText).toString('hex');

  const { pubKey, signatureStr } = await portkeyWalletProvider.getManagerPublicKey(
    AElf.utils.sha256(plainTextHex),
  );
  if (!pubKey || !signatureStr) return; // TODO
  if (!portkeyWalletProvider?.caHash) return; // TODO

  return await queryAuthApi({
    pubkey: pubKey,
    signature: signatureStr,
    plain_text: plainTextHex,
    ca_hash: '2ed9e4c3587f7d7d69ed1254d3f44b99b069cc05b257ef25f9ab0d8bd3024a71', // portkeyWalletProvider.caHash, // TODO
    chain_id: chainId,
  });
};
