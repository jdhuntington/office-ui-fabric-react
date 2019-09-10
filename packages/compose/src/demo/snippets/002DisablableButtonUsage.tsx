import * as React from 'react';
import { MyButton } from './002DisablableButton';

export const Usage: React.FunctionComponent<{}> = (props: {}) => {
  return (
    <div>
      <MyButton>Hello, World! (enabled)</MyButton>
      <MyButton disabled>Hello, World! (disabled)</MyButton>
    </div>
  );
};
