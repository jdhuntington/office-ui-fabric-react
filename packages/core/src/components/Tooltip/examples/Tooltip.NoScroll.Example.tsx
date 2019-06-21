import * as React from 'react';
import { BaseComponent, getId } from '@uifabric/core/lib/Utilities';
import { DefaultButton } from '@uifabric/core/lib/Button';
import { TooltipHost } from '@uifabric/core/lib/Tooltip';

export class TooltipNoScrollExample extends BaseComponent<{}> {
  private readonly tooltipId = getId('text-tooltip');

  public render(): JSX.Element {
    return (
      <TooltipHost content="This is the tooltip" id={this.tooltipId} tooltipProps={{ style: { overflowY: 'auto' } }}>
        <DefaultButton aria-labelledby={this.tooltipId}>Tooltip without scroll</DefaultButton>
      </TooltipHost>
    );
  }
}
