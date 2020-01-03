import { Fabric } from 'office-ui-fabric-react';
import * as React from 'react';
// tslint:disable: jsx-ban-props

export const LtrContextWithFabric: React.FunctionComponent<{}> = props => {
  return (
    <Fabric dir="ltr">
      <div style={{ background: '#fac' }}>
        <h6>
          <code>Fabric: ltr</code>
        </h6>
        <div>{props.children}</div>
      </div>
    </Fabric>
  );
};
