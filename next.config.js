const webpack = require('webpack');

const withTm = require('next-transpile-modules')(['shared']);

const path = require('path');
const fs = require('fs');

function initialize(config, rootPath) {
  const envName = process.env.ENVNAME || 'local';
  const envPath = path.join(rootPath, `./env/${envName}`);
  config.env = JSON.parse(fs.readFileSync(envPath));
}

module.exports = withTm({
  initialize,
  webpack(config) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        cn: 'classnames',
      }),
    );
    return config;
  },
});
