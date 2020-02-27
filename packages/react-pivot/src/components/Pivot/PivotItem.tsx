import * as React from 'react';
import { getNativeProps, divProperties } from '@uifabric/utilities';
import { IPivotItemProps } from './PivotItem.types';

export const PivotItem: React.FunctionComponent<IPivotItemProps> = props => {
  return <div {...getNativeProps(props, divProperties)}>{props.children}</div>;
};
