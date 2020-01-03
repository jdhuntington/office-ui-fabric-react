import { Fabric } from 'office-ui-fabric-react';
import * as React from 'react';
// tslint:disable: jsx-ban-props
export const RtlContextWithFabric: React.FunctionComponent<{}> = props => {
  return (
    <Fabric dir="rtl">
      <div style={{ background: '#45f' }}>
        <h6>
          <code>Fabric: rtl</code>
        </h6>
        <div>{props.children}</div>
      </div>
    </Fabric>
  );
};
