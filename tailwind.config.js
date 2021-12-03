require('dotenv/config');

/**
 * 주요 포인트
 * tailwind intellisense 플러그인 이슈 때문에
 * .env 파일에 PACKAGE_NAME을 명시해야 합니다. (ex. PACKAGE_NAME=todo)
 */
const config = require(`./packages/${process.env.PACKAGE_NAME}/tailwind.config.js`);
module.exports = config;
