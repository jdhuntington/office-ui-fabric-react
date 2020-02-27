const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/demo/index.tsx',

  output: {
    filename: 'demo-app.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      '@uifabric/example-app-base$': path.resolve(__dirname, '../../packages/example-app-base/src'),
      '@uifabric/foundation$': path.resolve(__dirname, '../../packages/foundation/src'),
      '@uifabric/react-pivot/src': path.resolve(__dirname, 'src'),
      '@uifabric/react-pivot/lib': path.resolve(__dirname, 'src'),
      '@uifabric/react-pivot': path.resolve(__dirname, 'src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
