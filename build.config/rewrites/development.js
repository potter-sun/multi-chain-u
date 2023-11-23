const host = 'https://localtest-applesign.portkey.finance';

module.exports = [
  {
    source: '/api/:path*',
    destination: `${host}/api/:path*`,
  },
];
