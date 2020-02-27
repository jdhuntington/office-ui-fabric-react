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

export class PivotOnChangeExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div style={theme as any}>
        <Pivot aria-label="OnChange Pivot Example" onLinkClick={this.onLinkClick}>
          <PivotItem headerText="Foo" itemKey="Foo">
            Pivot #1
          </PivotItem>
          <PivotItem headerText="Bar" itemKey="Bar">
            Pivot #2
          </PivotItem>
          <PivotItem headerText="Bas" itemKey="Bas">
            Pivot #3
          </PivotItem>
          <PivotItem headerText="Biz" itemKey="Biz">
            Pivot #4
          </PivotItem>
        </Pivot>
      </div>
    );
  }

  public onLinkClick(item: IPivotItemProps): void {
    alert(item.headerText);
  }
}
