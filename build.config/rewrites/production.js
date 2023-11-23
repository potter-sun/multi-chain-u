const host = 'https://did-portkey.portkey.finance';

module.exports = [
  {
    source: '/api/:path*',
    destination: `${host}/api/:path*`,
  },
];
