import { compose, ITheme } from '@uifabric/react-theming';
import { createTheme, ITheme as LegacyTheme } from 'office-ui-fabric-react';
import { ChoiceGroupOptionBase } from './ChoiceGroupOption.base';
import * as React from 'react';
import { getStyles } from './ChoiceGroupOption.styles';

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

export const MyChoiceGroupOption = compose(
  (props: any) => {
    return <ChoiceGroupOptionBase {...props} />;
  },
  {
    tokens: legacyTokenMapper,
    styles: legacyStyleMapper(getStyles)
  }
);
