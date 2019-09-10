import * as React from 'react';
import { Markdown } from '@uifabric/example-app-base';

export const GettingStartedPage: React.StatelessComponent = () => {
  return (
    <div>
      <Markdown>{require<string>('!raw-loader!../../docs/_authoring.md')}</Markdown>
    </div>
  );
};
