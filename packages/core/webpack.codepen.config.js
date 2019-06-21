const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/index.bundle.ts',

  output: {
    filename: '@uifabric/core.js',
    libraryTarget: 'var',
    library: 'Fabric'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      '@uifabric/core$': path.join(__dirname, 'src'),
      '@uifabric/core/src': path.join(__dirname, 'src'),
      '@uifabric/core/lib': path.join(__dirname, 'src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
