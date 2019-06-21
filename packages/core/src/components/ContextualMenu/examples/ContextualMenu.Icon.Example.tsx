import * as React from 'react';
import { ContextualMenuItemType, IContextualMenuItemProps } from '@uifabric/core/lib/ContextualMenu';
import { Callout } from '@uifabric/core/lib/Callout';
import { DefaultButton } from '@uifabric/core/lib/Button';
import { Icon } from '@uifabric/core/lib/Icon';
import * as stylesImport from './ContextualMenuExample.scss';

// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export class ContextualMenuIconExample extends React.Component<{}, { showCallout: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showCallout: false
    };
  }

  public render(): JSX.Element {
    const { showCallout } = this.state;

    return (
      <div>
        <DefaultButton
          text="Click for ContextualMenu"
          menuProps={{
            shouldFocusOnMount: true,
            items: [
              {
                key: 'openInWord',
                text: 'Open in Word',
                onRenderIcon: (props: IContextualMenuItemProps) => {
                  return (
                    <span className={styles.iconContainer}>
                      <Icon iconName={'WordLogoFill16'} className={styles.logoFillIcon} />
                      <Icon iconName={'WordLogo16'} className={styles.logoIcon} />
                    </span>
                  );
                }
              },
              {
                key: 'newItem',
                iconProps: {
                  iconName: 'Add'
                },
                text: 'New'
              },
              {
                key: 'upload',
                onClick: () => {
                  this.setState({ showCallout: true });
                },
                iconProps: {
                  iconName: 'Upload',
                  style: {
                    color: 'salmon'
                  }
                },
                text: 'Upload (Click for popup)',
                title: 'Upload a file'
              },
              {
                key: 'divider_1',
                itemType: ContextualMenuItemType.Divider
              },
              {
                key: 'share',
                iconProps: {
                  iconName: 'Share'
                },
                text: 'Share'
              },
              {
                key: 'print',
                iconProps: {
                  iconName: 'Print'
                },
                text: 'Print'
              },
              {
                key: 'music',
                iconProps: {
                  iconName: 'MusicInCollectionFill'
                },
                text: 'Music'
              }
            ]
          }}
        />
        {showCallout && (
          <Callout
            setInitialFocus={true}
            // tslint:disable-next-line:jsx-no-lambda
            onDismiss={() => this.setState({ showCallout: false })}
          >
            <DefaultButton
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() => this.setState({ showCallout: false })}
              text="Hello Popup"
            />
          </Callout>
        )}
      </div>
    );
  }
}
