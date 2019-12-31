const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/index.tsx',
  output: {
    filename: 'scratch.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
});
