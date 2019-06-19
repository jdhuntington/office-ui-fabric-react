const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

const BUNDLE_NAME = 'react-sidebar';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'FabricReactSidebar'
    },

    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

    resolve: {
      alias: {
        '@uifabric/react-sidebar/src': path.join(__dirname, 'src'),
        '@uifabric/react-sidebar/lib': path.join(__dirname, 'lib'),
        '@uifabric/react-sidebar': path.join(__dirname, 'lib')
      }
    }
  }),
  require('./webpack.serve.config')
];
