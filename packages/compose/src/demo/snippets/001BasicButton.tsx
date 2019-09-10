import * as React from 'react';

// tslint:disable-next-line: interface-name
interface MyButtonProps {
  children?: any;
}

export const MyButton: React.FunctionComponent<MyButtonProps> = (props: MyButtonProps) => {
  return <button>{props.children}</button>;
};
