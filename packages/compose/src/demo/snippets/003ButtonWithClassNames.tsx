import * as React from 'react';

// tslint:disable-next-line: interface-name
interface MyButtonProps {
  children?: any;
  disabled?: boolean;
  classes?: {
    root?: string;
    rootDisabled?: string;
  };
}

export const MyButton: React.FunctionComponent<MyButtonProps> = (props: MyButtonProps) => {
  let resolvedClassnames = props.classes && props.classes.root;
  if (props.disabled && props.classes && props.classes.rootDisabled) {
    resolvedClassnames = resolvedClassnames + ' ' + props.classes.rootDisabled;
  }

  return (
    <button className={resolvedClassnames} disabled={props.disabled}>
      {props.children}
    </button>
  );
};
