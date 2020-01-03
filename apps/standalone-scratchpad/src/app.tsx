import { getRTL, setRTL } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { FabricEtc } from './fabric-etc';
import { LtrContextWithFabric } from './ltr-context-with-fabric';
import { LtrContextWithTheme } from './ltr-context-with-theme';
import { RtlContextWithFabric } from './rtl-context-with-fabric';
import { RtlContextWithTheme } from './rtl-context-with-theme';

// tslint:disable: jsx-no-lambda

export const App: React.FunctionComponent<{}> = props => {
  const [isRtl, setIsRtl] = React.useState(getRTL());
  const toggleRtl = React.useCallback(() => {
    setRTL(!isRtl);
    setIsRtl(!isRtl);
  }, [isRtl, setIsRtl]);
  React.useEffect(() => {
    const timeout = setTimeout(toggleRtl, 1234);
    return () => clearTimeout(timeout);
  }, [isRtl, setIsRtl, toggleRtl]);
  const [showBaseTests, setShowBaseTests] = React.useState(false);
  const [showHtmlTests, setShowHtmlTests] = React.useState(false);
  const [showContextTests, setShowContextTests] = React.useState(false);
  const [showThemeTests, setShowThemeTests] = React.useState(true);

  return (
    <>
      <div dir="ltr">
        <h1>RTL test</h1>
        <h4>
          Global RTL: <code>{getRTL() ? 'true' : 'false'}</code>
        </h4>
        <div>
          <button onClick={toggleRtl}>Toggle RTL</button>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={showBaseTests} onChange={() => setShowBaseTests(!showBaseTests)} />
            &nbsp;Show base tests
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={showHtmlTests} onChange={() => setShowHtmlTests(!showHtmlTests)} />
            &nbsp;Show html tests
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={showContextTests} onChange={() => setShowContextTests(!showContextTests)} />
            &nbsp;Show context tests
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={showThemeTests} onChange={() => setShowThemeTests(!showThemeTests)} />
            &nbsp;Show theme tests
          </label>
        </div>
      </div>

      {showBaseTests && <FabricEtc />}
      {showHtmlTests && (
        <>
          <div dir="ltr">
            <h4>LTR</h4>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

          <div dir="rtl">
            <h4>RTL</h4>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

          <div dir="rtl">
            <h4>RTL</h4>
            <p>Lorem ipsum dolor sit amet.</p>
            <div dir="rtl">
              <h4>RTL</h4>
              <p>Lorem ipsum dolor sit amet.</p>
              <div dir="rtl">
                <h4>RTL</h4>
                <p>Lorem ipsum dolor sit amet.</p>
                <div dir="ltr">
                  <h4>LTR</h4>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showContextTests && (
        <>
          <RtlContextWithFabric>
            <FabricEtc />
          </RtlContextWithFabric>

          <LtrContextWithFabric>
            <FabricEtc />
          </LtrContextWithFabric>

          <RtlContextWithFabric>
            <FabricEtc />

            <LtrContextWithFabric>
              <FabricEtc />
              <RtlContextWithFabric>
                <FabricEtc />
              </RtlContextWithFabric>
            </LtrContextWithFabric>
          </RtlContextWithFabric>
        </>
      )}

      {showThemeTests && (
        <>
          <RtlContextWithTheme>
            <FabricEtc />
          </RtlContextWithTheme>

          <LtrContextWithTheme>
            <FabricEtc />
          </LtrContextWithTheme>
        </>
      )}
    </>
  );
};
