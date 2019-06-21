let { createConfig } = require('../../scripts/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    // These mappings allow Jest to run snapshot tests against Example files.
    '@uifabric/core/lib/(.*)$': '<rootDir>/src/$1',
    '@uifabric/core$': '<rootDir>/src/'
  },

  snapshotSerializers: [path.resolve(__dirname, './node_modules/@uifabric/jest-serializer-merge-styles')]
});

module.exports = config;
