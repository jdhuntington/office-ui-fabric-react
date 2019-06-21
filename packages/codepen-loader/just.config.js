const { taskPresets, task, series, parallel, tscTask, copyTask } = require('just-scripts');

taskPresets.lib();

task('ts', tscTask({ module: 'commonjs', outDir: './lib' }));

task(
  'copy',
  copyTask(
    [
      '../core/src/utilities/exampleData.ts',
      '../core/src/components/ExtendedPicker/examples/PeopleExampleData.ts',
      '../core/src/common/TestImages.ts'
    ],
    'lib'
  )
);

task('build', series('clean', 'copy', parallel('jest', 'ts')));
