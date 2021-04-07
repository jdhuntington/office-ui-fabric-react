// @ts-check
const { buildEntries, createWebpackConfig } = require('./webpackUtils');
module.exports = createWebpackConfig(buildEntries('button', 'multiControl'));
