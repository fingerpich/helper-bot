const USER_AGENTS = require('./agents')

module.exports = (referer) => {
  const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    // '--proxy-server=socks5://127.0.0.1:1112',
    // '--proxy-server=http://127.0.0.1:1087',
    '--ignore-certifcate-errors-spki-list',
    '--user-agent="' + USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)] + '"',
    '--referer="' + referer + '"'
  ];

  return {
    args,
    headless: false,
    ignoreHTTPSErrors: true,
    userDataDir: './tmp'
  };
};
