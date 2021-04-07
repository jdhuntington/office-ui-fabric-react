// @ts-check
const path = require('path');
const fs = require('fs-extra');
const resources = require('@fluentui/scripts/webpack/webpack-resources');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

const FIXTURE_PATH = 'temp/fixtures/';

function createWebpackConfig(entries) {
  return Object.keys(entries).map(entryName => {
    let anaylizerPluginOptions = {
      analyzerMode: 'static',
      reportFilename: entryName + '.stats.html',
      openAnalyzer: false,
      generateStatsFile: false,
      logLevel: 'warn',
    };

    const { entryPath } = entries[entryName];

    return resources.createConfig(
      entryName,
      true,
      {
        entry: {
          [entryName]: entryPath,
        },
        module: {
          rules: [
            {
              test: [/\.tsx?$/],
              use: {
                loader: 'ts-loader',
                options: {
                  experimentalWatchApi: true,
                  transpileOnly: true,
                },
              },
              exclude: [/node_modules/, /\.scss.ts$/, /\.test.tsx?$/],
            },
          ],
        },
        externals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              extractComments: false,
            }),
          ],
        },
      },
      true,
      true,
    )[0];
  });
}

/**
 * Webpack will remove any unused import as a dead code (tree shaking).
 * Thus we are creating temporary JS files with top-level component imports
 * and console logging them. This will ensure that the code is active
 * and that webpack bundles it correctly.
 */
function createFluentNorthstarFixtures() {
  const packageName = '@fluentui/react-northstar';
  const distPath = path.dirname(require.resolve(packageName).replace('commonjs', 'es'));
  const packagePath = path.resolve(distPath, 'components');
  fs.readdirSync(packagePath).forEach(itemName => {
    const isFolder = fs.statSync(path.join(packagePath, itemName)).isDirectory();

    if (isFolder && itemName) {
      const importStatement = `import { ${itemName} } from '${packageName}'; console.log(${itemName})`;
      try {
        const folderName = getFolderName(packageName);
        const entryPath = path.join(FIXTURE_PATH, folderName, `${itemName}.js`);
        fs.outputFileSync(entryPath, importStatement, 'utf-8');
      } catch (err) {
        console.log(err);
      }
    }
  });
}

/**
 * Build webpack entries from created fixtures.
 *
 * @param {boolean} [includeStats] - Stats are generated and used by the size auditor report
 * to check more details on what caused the bundle size change. Due to stats generation being slow,
 * and therefore slowing down CI significantly, setting this to true to avoid stats generation.
 * If bundle size is changed unexpectedly, developers can drill down deeper on the problem by
 * locally running bundle tests.
 */
function buildEntries(...scenarioNames) {
  const entries = {};
  scenarioNames.forEach(entryName => {
    const entryPath = path.resolve(path.join('scenarios', `${entryName}.tsx`));
    entries[entryName] = {
      entryPath: entryPath,
    };
  });
  return entries;
}

/**
 * Build entries for single fixture with top level import.
 */
function buildEntry(packageName, includeStats = true) {
  const folderName = getFolderName(packageName);
  const entryPath = path.resolve(path.join(FIXTURE_PATH, folderName));
  return {
    entryPath: `${entryPath}/index.js`,
    includeStats,
  };
}

function getFolderName(packageName) {
  return packageName.replace('@fluentui/', '');
}

module.exports = { buildEntries, createWebpackConfig };
