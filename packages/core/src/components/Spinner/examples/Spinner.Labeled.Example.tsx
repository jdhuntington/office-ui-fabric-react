import * as React from 'react';
import { Spinner } from '@uifabric/core/lib/Spinner';
import { IStackTokens, Stack } from '@uifabric/core/lib/Stack';
import { Label } from '@uifabric/core/lib/Label';

export const SpinnerLabeledExample: React.StatelessComponent = () => {
  const stackTokens: IStackTokens = {
    childrenGap: 20,
    maxWidth: 250
  };

  return (
    <Stack tokens={stackTokens}>
      <div>
        <Label>Spinner with label positioned below</Label>
        <Spinner label="I am definitely loading..." />
      </div>

      <div>
        <Label>Spinner with label positioned above</Label>
        <Spinner label="Seriously, still loading..." ariaLive="assertive" labelPosition="top" />
      </div>

      <div>
        <Label>Spinner with label positioned to right</Label>
        <Spinner label="Wait, wait..." ariaLive="assertive" labelPosition="right" />
      </div>

      <div>
        <Label>Spinner with label positioned to left</Label>
        <Spinner label="Nope, still loading..." ariaLive="assertive" labelPosition="left" />
      </div>
    </Stack>
  );
};
