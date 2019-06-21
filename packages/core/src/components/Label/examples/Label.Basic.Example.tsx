import * as React from 'react';

import { Label } from '@uifabric/core/lib/Label';
import { TextField } from '@uifabric/core/lib/TextField';
import { getId } from '@uifabric/core/lib/Utilities';

export const LabelBasicExample = () => {
  // Use getId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure uniqueness.)
  const textFieldId = getId('anInput');

  return (
    <div>
      <Label>I'm a Label</Label>
      <Label disabled={true}>I'm a disabled Label</Label>
      <Label required={true}>I'm a required Label</Label>
      <Label htmlFor={textFieldId}>A Label for An Input</Label>
      <TextField id={textFieldId} />
    </div>
  );
};
