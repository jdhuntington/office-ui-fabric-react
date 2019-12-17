import { compose } from '@uifabric/react-theming';
import { SliderBase } from 'office-ui-fabric-react';
import * as React from 'react';

export const MySlider = compose(
  (props: any) => <SliderBase {...props} />,
  {}
);
