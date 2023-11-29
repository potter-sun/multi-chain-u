const commonHost = 'https://did-portkey.portkey.finance';

const ETransHost = 'https://etrans.exchange';

module.exports = [
  {
    source: '/api/etrans/:path*',
    destination: `${ETransHost}/api/app/:path*`,
  },
  {
    source: '/api/:path*',
    destination: `${commonHost}/api/:path*`,
  },
];
