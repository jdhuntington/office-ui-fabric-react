const { createGzip } = require('zlib');
const { promisify } = require('util');
const { pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const path = require('path');
const stream = require('stream');
const pipe = promisify(pipeline);

const thresholds = require('./../thresholds/thresholds.json');

async function calculateSize(bundleName) {
  const source = createReadStream(path.join(__dirname, '..', 'dist', `${bundleName}.min.js`));
  let size = 0;
  const output = new stream.Writable({
    write: (buffer, encoding, cb) => {
      size += buffer.length;
      cb();
    },
  });
  await pipe(source, createGzip(), output);
  return size;
}

let exitCode = 0;

const checkBundle = async (bundleName, { target, max }) => {
  const size = await calculateSize(bundleName);

  if (size > max) {
    exitCode = 42;
    console.error(
      `converged-bundles: Scenario '${bundleName}' is ${size} bytes (compressed), larger than the maximum allowed of ${max}.`,
    );
  } else if (size > target) {
    console.warn(
      `converged-bundles: Scenario '${bundleName}' is ${size} bytes (compressed), larger than the target size of ${target}.`,
    );
  }
};

const runAll = async () => {
  await Promise.all(Object.keys(thresholds).map(t => checkBundle(t, thresholds[t])));
  process.exit(exitCode);
};

runAll();
