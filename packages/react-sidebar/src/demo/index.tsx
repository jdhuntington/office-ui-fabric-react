import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Sidebar } from '../components/Sidebar/index';
import { Text, mergeStyles, mergeStyleSets, DefaultButton, Link } from 'office-ui-fabric-react';
import { LoremIpsum } from './LoremIpsum';
import { Menu, MenuItem } from '../components/Menu/Menu';

mergeStyles({
  selectors: {
    ':global(html), :global(body)': {
      padding: 0,
      margin: 0
    }
  }
});

const styles = mergeStyleSets({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: '#111',
    color: '#ddd',
    padding: '0',
    height: '7vh'
  },
  headerText: {},
  main: {
    display: 'flex'
  },
  body: {
    background: '#acf',
    flexGrow: 1,
    padding: '1rem'
  },
  sidebar: {
    height: '93vh'
  }
});

const App: React.FunctionComponent<{}> = (props: {}) => {
  const [paragraphCount, updateParagraphCount] = React.useState(4);
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Text as="h1" className={styles.headerText} variant="xLarge">
          Fabric React Sidebar examples
        </Text>
      </header>
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar>
            <Menu>
              <MenuItem>
                <Link>Home</Link>
              </MenuItem>
              <MenuItem>
                <Link>About</Link>
              </MenuItem>
              <MenuItem>
                <Link>Preferences</Link>
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
        <div className={styles.body}>
          <Text as="h1">Body</Text>
          <div>
            <DefaultButton onClick={() => updateParagraphCount(Math.max(paragraphCount - 1, 0))}>--</DefaultButton>
            <DefaultButton onClick={() => updateParagraphCount(Math.min(paragraphCount + 1, 20))}>++</DefaultButton>
            <div>
              <Text>
                Paragraphs: <strong>{paragraphCount}</strong>
              </Text>
            </div>
          </div>
          <LoremIpsum paragraphs={paragraphCount} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('content'));
