const commonHost = 'https://did-portkey-test.portkey.finance';

const ETransHost = 'https://test.etrans.exchange';

const GraphqlHost = 'https://dapp-portkey-test.portkey.finance';

module.exports = [
  {
    source: '/api/etrans/:path*',
    destination: `${ETransHost}/api/app/:path*`,
  },
  {
    source: '/api/:path*',
    destination: `${commonHost}/api/:path*`,
  },
  {
    source: '/graphql/:path*',
    destination: `${GraphqlHost}/Portkey_DID/PortKeyIndexerCASchema/graphql/:path*`,
  },
];
