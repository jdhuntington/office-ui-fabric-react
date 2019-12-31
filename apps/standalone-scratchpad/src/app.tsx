import * as React from 'react';
import { getRTL, setRTL } from 'office-ui-fabric-react/lib/Utilities';
import { FabricEtc } from './fabric-etc';

export const App: React.FunctionComponent<{}> = props => {
  const [isRtl, setIsRtl] = React.useState(getRTL());
  const toggleRtl = React.useCallback(() => {
    setRTL(!isRtl);
    setIsRtl(!isRtl);
  }, [isRtl, setIsRtl]);
  return (
    <>
      <h1>RTL test</h1>
      <h4>
        Global RTL: <code>{getRTL() ? 'true' : 'false'}</code>
      </h4>
      <button onClick={toggleRtl}>Toggle RTL</button>
      <FabricEtc />
    </>
  );
};
