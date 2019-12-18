import { ComponentPage, ExampleCard, IComponentDemoPageProps } from '@uifabric/example-app-base';
import { ITheme, ThemeProvider } from '@uifabric/react-theming';
import { ChoiceGroup, DropdownMenuItemType, IDropdownOption, Slider, Dropdown, TextField } from 'office-ui-fabric-react';
import * as React from 'react';

import { MyChoiceGroup } from './ChoiceGroupCompose';
import { MySlider } from './SliderCompose';
import { MyDropdown } from './DropdownCompose';
import { MyTextField } from './TextFieldCompose';

const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' }
];

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
            <ExampleCard title="ChoiceGroup (OUFR)">
              <ChoiceGroup
                className="defaultChoiceGroup"
                defaultSelectedKey="B"
                options={[
                  {
                    key: 'A',
                    text: 'Option A'
                  },
                  {
                    key: 'B',
                    text: 'Option B'
                  },
                  {
                    key: 'C',
                    text: 'Option C',
                    disabled: true
                  },
                  {
                    key: 'D',
                    text: 'Option D'
                  }
                ]}
                label="Pick one"
                required={true}
              />
            </ExampleCard>
            <ExampleCard title="ChoiceGroup (Composed)">
              <ThemeProvider theme={theme}>
                <MyChoiceGroup
                  className="defaultChoiceGroup"
                  defaultSelectedKey="B"
                  options={[
                    {
                      key: 'A',
                      text: 'Option A'
                    },
                    {
                      key: 'B',
                      text: 'Option B'
                    },
                    {
                      key: 'C',
                      text: 'Option C',
                      disabled: true
                    },
                    {
                      key: 'D',
                      text: 'Option D'
                    }
                  ]}
                  label="Pick one"
                  required={true}
                />
              </ThemeProvider>
            </ExampleCard>
            <ExampleCard title="Dropdown (OUFR)">
              <Dropdown placeholder="Select an option" label="Basic uncontrolled example" options={options} />
            </ExampleCard>
            <ExampleCard title="Dropdown (Composed)">
              <ThemeProvider theme={theme}>
                <MyDropdown placeholder="Select an option" label="Basic uncontrolled example" options={options} />
              </ThemeProvider>
            </ExampleCard>
            <ExampleCard title="TextField (OUFR)">
              <TextField />
            </ExampleCard>
            <ExampleCard title="TextField (Composed)">
              <ThemeProvider theme={theme}>
                <MyTextField />
              </ThemeProvider>
            </ExampleCard>
          </div>
        }
        overview={<span>Can we compose?</span>}
      />
    );
  }
}
