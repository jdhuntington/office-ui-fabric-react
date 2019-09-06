import * as React from 'react';
import { MsftButton } from '../MsftButton';
import { Stack } from 'office-ui-fabric-react';

const tokens = {
  sectionStack: {
    childrenGap: 32
  },
  headingStack: {
    childrenGap: 16,
    padding: 8
  },
  buttonStack: {
    childrenGap: 12
  }
};

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.buttonStack}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonMsftExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack}>
          <Stack tokens={tokens.buttonStack}>
            <ButtonStack>
              <MsftButton content="Default button" />
              <MsftButton disabled content="Disabled default button" />
            </ButtonStack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
