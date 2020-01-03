import { Fabric, Customizer, createTheme } from 'office-ui-fabric-react';
import * as React from 'react';
// tslint:disable: jsx-ban-props
const rtlTheme = createTheme({ rtl: true });
export const RtlContextWithTheme: React.FunctionComponent<{}> = props => {
  return (
    <Customizer settings={{ theme: rtlTheme }}>
      <div style={{ background: '#4ff' }} dir="rtl">
        <h6>
          <code>Customizer: rtl</code>
        </h6>
        <div>{props.children}</div>
      </div>
    </Customizer>
  );
};
