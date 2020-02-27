import * as React from 'react';
import { Pivot, PivotItem, IPivotItemProps } from '../index';

// tslint:disable: jsx-ban-props

const theme = {
  '--fluent-animation-duration-2': '0.267s',
  '--fluent-animation-value-2': 'cubic-bezier(.1,.25,.75,.9)',
  '--fluent-color-action-link': '#333333',
  '--fluent-color-button-background-hovered': '#eaeaea',
  '--fluent-color-button-background-pressed': '#eaeaea',
  '--fluent-color-button-text-hovered': '#000000',
  '--fluent-color-focus-border': '#000000',
  '--fluent-color-input-background-checked': 'rgb(0, 120, 212)',
  '--fluent-color-link': '#0078d4',
  '--fluent-font-family': `'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`,
  '--fluent-font-medium': '14px',
  '--fluent-font-weight-bold': '700',
  '--fluent-font-weight-semibold': '600'
};

export const PivotIconCountExample: React.FunctionComponent = () => {
  return (
    <div style={theme as any}>
      <Pivot aria-label="Count and Icon Pivot Example">
        <PivotItem headerText="My Files" itemCount={42} itemKey="1" itemIcon="Emoji2">
          Pivot #1
        </PivotItem>
        <PivotItem itemCount={23} itemKey="2" itemIcon="Recent">
          Pivot #2
        </PivotItem>
        <PivotItem headerText="Placeholder" itemKey="3" itemIcon="Globe">
          Pivot #3
        </PivotItem>
        <PivotItem headerText="Shared with me" itemKey="4" itemIcon="Ringer" itemCount={1}>
          Pivot #4
        </PivotItem>
        <PivotItem headerText="Customized Rendering" itemKey="5" itemIcon="Globe" itemCount={10} onRenderItemLink={_customRenderer}>
          Customized Rendering
        </PivotItem>
      </Pivot>
    </div>
  );
};

function _customRenderer(link: IPivotItemProps, defaultRenderer: (link: IPivotItemProps) => JSX.Element): JSX.Element {
  return (
    <span>
      {defaultRenderer(link)}
      <div style={{ color: 'red' }}>***</div>
    </span>
  );
}
