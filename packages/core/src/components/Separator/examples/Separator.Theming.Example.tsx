import * as React from 'react';
import { Separator } from '@uifabric/core/lib/Separator';
import { createTheme, ITheme } from '@uifabric/core/lib/Styling';
import { Stack, IStackTokens } from '@uifabric/core/lib/Stack';
import { Text } from '@uifabric/core/lib/Text';

const theme: ITheme = createTheme({
  fonts: {
    medium: {
      fontFamily: 'Monaco, Menlo, Consolas',
      fontSize: '30px'
    }
  }
});

const stackTokens: IStackTokens = { childrenGap: 12 };

export class SeparatorThemingExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const content = 'Today';

    return (
      <Stack tokens={stackTokens}>
        <Text>Horizontal center aligned with custom theme</Text>
        <Separator theme={theme}>{content}</Separator>
      </Stack>
    );
  }
}
