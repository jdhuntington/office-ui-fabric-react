import * as React from 'react';
import { Label } from '@uifabric/core/lib/Label';
import { Pivot, PivotItem, PivotLinkFormat } from '@uifabric/core/lib/Pivot';

export class PivotTabsExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.tabs}>
          <PivotItem headerText="Foo">
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem headerText="Bar">
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="Bas">
            <Label>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="Biz">
            <Label>Pivot #4</Label>
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
