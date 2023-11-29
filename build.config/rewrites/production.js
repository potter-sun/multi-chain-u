const commonHost = 'https://did-portkey.portkey.finance';

const ETransHost = 'https://etrans.exchange';

const GraphqlHost = 'https://dapp-portkey.portkey.finance';

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
