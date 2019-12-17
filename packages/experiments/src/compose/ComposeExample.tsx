import { ComponentPage, ExampleCard, IComponentDemoPageProps } from '@uifabric/example-app-base';
import { Slider } from 'office-ui-fabric-react';
import * as React from 'react';
import { ThemeProvider, ITheme } from '@uifabric/react-theming';
import { MySlider } from './SliderCompose';

const theme: ITheme = {
  direction: 'ltr',
  colors: {
    background: '#ffffff',
    bodyText: '#ffffff',
    subText: '#ffffff',
    disabledText: '#ffffff',
    brand: { values: [], index: -1 },
    accent: { values: [], index: -1 },
    neutral: { values: [], index: -1 },
    success: { values: [], index: -1 },
    warning: { values: [], index: -1 },
    danger: { values: [], index: -1 }
  },
  fonts: {
    default: '',
    mono: '',
    userContent: ''
  },
  fontSizes: {
    base: 10,
    scale: 10,
    unit: 'px'
  },
  animations: {
    fadeIn: {},
    fadeOut: {}
  },
  spacing: {
    base: 10,
    scale: 10,
    unit: 'px'
  },
  radius: {
    base: 10,
    scale: 10,
    unit: 'px'
  },
  icons: {},
  components: {},
  schemes: {}
};

export class ComposeExample extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Compose"
        componentName="Compose"
        exampleCards={
          <div>
            <ExampleCard title="Slider (OUFR)">
              <Slider />
            </ExampleCard>
            <ExampleCard title="Slider (Composed)">
              <ThemeProvider theme={theme}>
                <MySlider />
              </ThemeProvider>
            </ExampleCard>
          </div>
        }
        overview={<span>Can we compose?</span>}
      />
    );
  }
}
