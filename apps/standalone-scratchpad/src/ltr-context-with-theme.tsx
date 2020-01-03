import { Fabric, Customizer, createTheme } from 'office-ui-fabric-react';
import * as React from 'react';
// tslint:disable: jsx-ban-props
const ltrTheme = createTheme({ rtl: false });
export const LtrContextWithTheme: React.FunctionComponent<{}> = props => {
  return (
    <Customizer settings={{ theme: ltrTheme }}>
      <div style={{ background: '#8da' }} dir="ltr">
        <h6>
          <code>Customizer: ltr</code>
        </h6>
        <div>{props.children}</div>
      </div>
    </Customizer>
  );
};
