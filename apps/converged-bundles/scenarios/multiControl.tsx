import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@fluentui/react-button';
import { Link } from '@fluentui/react-link';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const App: React.FunctionComponent = ({}) => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Button>DefaultButton</Button>
      <Link>Link</Link>
    </FluentProvider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
