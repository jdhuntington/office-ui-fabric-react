import * as React from 'react';
import { MyButton } from './003ButtonWithClassNames';

export const Usage: React.FunctionComponent<{}> = (props: {}) => {
  const classes = {
    root: 'my-button-root',
    rootDisabled: 'my-button-root--disabled'
  };
  return (
    <div>
      <p>Inspect the buttons below to see the classnames applied.</p>
      <p>This is the classes object passed as prop:</p>
      <pre>{JSON.stringify(classes, null, 2)}</pre>
      <MyButton classes={classes}>Hello, World! (enabled)</MyButton>
      <MyButton disabled classes={classes}>
        Hello, World! (disabled)
      </MyButton>
    </div>
  );
};
