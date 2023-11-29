const commonHost = 'https://localtest-applesign.portkey.finance';

const ETransHost = 'https://test.etrans.exchange';

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
