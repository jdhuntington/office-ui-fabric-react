import * as React from 'react';
import { mergeStyleSets } from 'office-ui-fabric-react';

export interface IMenuProps {
  children?: any;
}

const menuStyles = mergeStyleSets({
  root: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
});

export const Menu: React.FunctionComponent<IMenuProps> = (props: IMenuProps) => {
  return <ul className={menuStyles.root}>{props.children}</ul>;
};

export interface IMenuItemProps {
  children?: any;
}

const menuItemStyles = mergeStyleSets({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  }
});

export const MenuItem: React.FunctionComponent<IMenuItemProps> = (props: IMenuItemProps) => {
  return <li className={menuItemStyles.root}>{props.children}</li>;
};
