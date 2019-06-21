import { DefaultButton, PrimaryButton } from '@uifabric/core/lib/Button';
import { ChoiceGroup } from '@uifabric/core/lib/ChoiceGroup';
import { Panel, PanelType } from '@uifabric/core/lib/Panel';
import * as React from 'react';

export interface IPanelSmallRightExampleState {
  showPanel: boolean;
}

export class PanelSmallRightExample extends React.Component<{}, IPanelSmallRightExampleState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._hidePanel}
          headerText="Panel - Small, right-aligned, fixed, with footer"
          closeButtonAriaLabel="Close"
          onRenderFooterContent={this._onRenderFooterContent}
        >
          <ChoiceGroup
            options={[
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                checked: true
              },
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              },
              {
                key: 'D',
                text: 'Option D',
                checked: true,
                disabled: true
              }
            ]}
            label="Pick one"
            required={true}
          />
        </Panel>
      </div>
    );
  }

  private _onRenderFooterContent = () => {
    return (
      <div>
        <PrimaryButton onClick={this._hidePanel} style={{ marginRight: '8px' }}>
          Save
        </PrimaryButton>
        <DefaultButton onClick={this._showPanel}>Cancel</DefaultButton>
      </div>
    );
  };

  private _showPanel = () => {
    this.setState({ showPanel: true });
  };

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };
}
