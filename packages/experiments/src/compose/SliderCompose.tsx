import { compose, ITheme } from '@uifabric/react-theming';
import { createTheme, ITheme as LegacyTheme } from 'office-ui-fabric-react';
import { SliderBase } from './SliderBase';
import * as React from 'react';
import { getStyles } from './SliderCompose.Styles';

const legacyTokenMapper = {
  theme: (_: any, theme: ITheme) =>
    createTheme({
      semanticColors: {
        inputBackground: theme.colors.bodyText
      }
    })
};

const legacyStyleMapper = (styleFn: any) => {
  return ({ theme }: any) => styleFn({ theme });
};

export const MySlider = compose(
  (props: any) => {
    const { classes, ...rest } = props;
    return <SliderBase {...rest} classNames={classes} />;
  },
  {
    tokens: legacyTokenMapper,
    styles: legacyStyleMapper(getStyles)
  }
);
