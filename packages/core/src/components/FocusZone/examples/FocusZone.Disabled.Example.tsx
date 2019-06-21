import * as React from 'react';

import { DefaultButton } from '@uifabric/core/lib/Button';
import { FocusZone, FocusZoneDirection } from '@uifabric/core/lib/FocusZone';
import { TextField } from '@uifabric/core/lib/TextField';
import { Stack } from '@uifabric/core/lib/Stack';

export const FocusZoneDisabledExample: React.StatelessComponent = () => {
  const tokens = { childrenGap: 20 };
  return (
    <Stack tokens={tokens} horizontalAlign="start">
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <Stack tokens={tokens} horizontal>
          <span>Enabled FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
          <TextField defaultValue="FocusZone TextField" styles={{ root: { width: 200 } }} />
          <DefaultButton>Button 3</DefaultButton>
        </Stack>
      </FocusZone>
      <DefaultButton>Tabbable Element 1</DefaultButton>
      <FocusZone disabled={true}>
        <Stack tokens={tokens} horizontal>
          <span>Disabled FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
        </Stack>
      </FocusZone>
      <TextField defaultValue="Tabbable Element 2" />
    </Stack>
  );
};
