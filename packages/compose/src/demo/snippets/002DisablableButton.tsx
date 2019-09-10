import * as React from 'react';

// tslint:disable-next-line: interface-name
interface MyButtonProps {
  children?: any;
  disabled?: boolean;
}

export const MyButton: React.FunctionComponent<MyButtonProps> = (props: MyButtonProps) => {
  return <button disabled={props.disabled}>{props.children}</button>;
};
