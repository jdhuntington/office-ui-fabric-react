import * as React from 'react';
import { MyThemedButton } from './010ThemedButton';
import { MyRedButton } from './011TokenedButton';

export const Usage: React.FunctionComponent<{}> = (props: {}) => {
  return (
    <div>
      <h3>A themed button</h3>
      <p>(Notice the classes)</p>
      <MyThemedButton>Hello, World!</MyThemedButton>

      <h3>A red button</h3>
      <MyRedButton>I'm red.</MyRedButton>
    </div>
  );
};
