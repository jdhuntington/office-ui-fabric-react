import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Sidebar } from '../components/Sidebar';
import { Text } from 'office-ui-fabric-react';

const App: React.FunctionComponent<{}> = (props: {}) => {
  return (
    <>
      <header>
        <Text>Fabric React Sidebar examples</Text>
      </header>
      <div>
        <Sidebar />
        <div>Body.</div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('content'));
