const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'react-pivot';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'FabricReactPivot'
    },

    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

    resolve: {
      alias: {
        '@uifabric/react-pivot/src': path.join(__dirname, 'src'),
        '@uifabric/react-pivot/lib': path.join(__dirname, 'lib'),
        '@uifabric/react-pivot': path.join(__dirname, 'lib')
      }
    }
  }),
  require('./webpack.serve.config')
];
