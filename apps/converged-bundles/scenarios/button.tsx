import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@fluentui/react-button';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const App: React.FunctionComponent = ({}) => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Button>DefaultButton</Button>
    </FluentProvider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
