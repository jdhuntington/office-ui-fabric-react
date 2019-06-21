import * as React from 'react';
import { mergeStyleSets, Button, Text } from 'office-ui-fabric-react';

export type SidebarMode = 'hidden' | 'compact' | 'visible';

export interface ISidebarProps {
  children?: any;
  mode?: SidebarMode;
}

const styles = mergeStyleSets({
  rootVisible: {
    background: '#0bf',
    width: '200px',
    height: '100%'
  },
  rootCompact: {
    background: '#fac',
    width: '40px',
    height: '100%'
  },
  rootTransition: {
    transition: 'all 0.3s ease-out'
  }
});

export interface ISidebarHeaderProps {
  children?: any;
  toggle: () => void;
}

const headerStyles = mergeStyleSets({
  root: {
    height: '48px'
  }
});

export const SidebarHeader: React.FunctionComponent<ISidebarHeaderProps> = (props: ISidebarHeaderProps) => {
  return (
    <div className={headerStyles.root}>
      <Button onClick={props.toggle}>T</Button>
    </div>
  );
};

export const Sidebar: React.FunctionComponent<ISidebarProps> = (props: ISidebarProps) => {
  const [mode, setMode] = React.useState<SidebarMode>('visible');
  const derivedMode = props.mode || mode;

  if (derivedMode === 'hidden') {
    return null;
  }
  if (derivedMode === 'compact') {
    return (
      <div key="root" className={[styles.rootCompact, styles.rootTransition].join(' ')}>
        <SidebarHeader toggle={() => setMode('visible')} />
        <div>{props.children}</div>
        <Text>{derivedMode}</Text>
      </div>
    );
  }
  return (
    <div key="root" className={[styles.rootVisible, styles.rootTransition].join(' ')}>
      <SidebarHeader toggle={() => setMode('compact')} />
      <div>{props.children}</div>
      <Text>{derivedMode}</Text>
    </div>
  );
};
