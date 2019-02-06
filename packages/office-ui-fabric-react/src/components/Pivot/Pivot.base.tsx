import * as React from 'react';
import { BaseComponent, KeyCodes, getId, getNativeProps, divProperties, classNamesFunction, warn } from '../../Utilities';
import { CommandButton } from '../../Button';
import { IPivotProps, IPivotStyleProps, IPivotStyles } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { PivotLinkFormat } from './Pivot.types';
import { PivotLinkSize } from './Pivot.types';
import { Icon } from '../../Icon';

const getClassNames = classNamesFunction<IPivotStyleProps, IPivotStyles>();

/**
 *  Usage:
 *
 *   <Pivot>
 *     <PivotItem linkText="Foo">
 *       <Label>Pivot #1</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bar">
 *       <Label>Pivot #2</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bas">
 *       <Label>Pivot #3</Label>
 *     </PivotItem>
 *   </Pivot>
 */

export interface IPivotState {
  selectedKey: string;
}

const PivotItemType = (<PivotItem /> as React.ReactElement<IPivotItemProps>).type;

export class PivotBase extends BaseComponent<IPivotProps, IPivotState> {
  private _keyToIndexMapping: { [key: string]: number };
  private _keyToTabIds: { [key: string]: string };
  private _pivotId: string;
  private focusZone = React.createRef<FocusZone>();
  private _classNames: { [key in keyof IPivotStyles]: string };
  private _links: IPivotItemProps[] = [];
  private _previousProps: IPivotProps | undefined = undefined;

  constructor(props: IPivotProps) {
    super(props);
    this._pivotId = getId('Pivot');
    this._updatePivotLinks();
    let selectedKey: string | undefined;

    if (props.initialSelectedKey) {
      selectedKey = props.initialSelectedKey;
    } else if (props.initialSelectedIndex) {
      selectedKey = this._links[props.initialSelectedIndex].itemKey as string;
    } else if (props.selectedKey) {
      selectedKey = props.selectedKey;
    } else if (this._links.length) {
      selectedKey = this._links[0].itemKey as string;
    }

    this.state = {
      selectedKey: selectedKey!
    } as IPivotState;

    this._renderPivotLink = this._renderPivotLink.bind(this);
  }

  /**
   * Sets focus to the first pivot tab.
   */
  public focus(): void {
    if (this.focusZone.current) {
      this.focusZone.current.focus();
    }
  }

  public render(): JSX.Element {
    if (this._previousProps !== this.props) {
      this._updatePivotLinks();
      this._previousProps = this.props;
    }

    const divProps = getNativeProps(this.props, divProperties);

    this._classNames = this._getClassNames(this.props);

    return (
      <div {...divProps}>
        {this._renderPivotLinks()}
        {this._renderPivotItem()}
      </div>
    );
  }

  /**
   * Renders the set of links to route between pivots
   */
  private _renderPivotLinks(): JSX.Element {
    const items = this._links.map(this._renderPivotLink);

    return (
      <FocusZone componentRef={this.focusZone} direction={FocusZoneDirection.horizontal}>
        <div className={this._classNames.root} role="tablist">
          {items}
        </div>
      </FocusZone>
    );
  }

  private _renderPivotLink = (link: IPivotItemProps): JSX.Element => {
    const { itemKey, headerButtonProps } = link;
    const tabId = this._keyToTabIds[itemKey as string];
    const { onRenderItemLink } = link;
    let linkContent: JSX.Element | null;
    const isSelected: boolean = this._isItemSelected(itemKey);

    if (onRenderItemLink) {
      linkContent = onRenderItemLink(link, this._renderLinkContent);
    } else {
      linkContent = this._renderLinkContent(link);
    }

    return (
      <CommandButton
        {...headerButtonProps}
        id={tabId}
        key={itemKey}
        className={isSelected ? this._classNames.linkIsSelected : this._classNames.link}
        onClick={this._onLinkClick.bind(this, itemKey)}
        onKeyPress={this._onKeyPress.bind(this, itemKey)}
        ariaLabel={link.ariaLabel}
        role="tab"
        aria-selected={this._isItemSelected(itemKey)}
        name={link.headerText}
        keytipProps={link.keytipProps}
      >
        {linkContent}
      </CommandButton>
    );
  };

  private _renderLinkContent = (link: IPivotItemProps): JSX.Element => {
    const { itemCount, itemIcon, headerText } = link;

    return (
      <span className={this._classNames.linkContent}>
        {itemIcon !== undefined && (
          <span className={this._classNames.icon}>
            <Icon iconName={itemIcon} />
          </span>
        )}
        {headerText !== undefined && <span className={this._classNames.text}> {link.headerText}</span>}
        {itemCount !== undefined && <span className={this._classNames.count}> ({itemCount})</span>}
      </span>
    );
  };

  /**
   * Renders the current Pivot Item
   */
  private _renderPivotItem = (): JSX.Element | null => {
    if (this.props.headersOnly) {
      return null;
    }

    const itemKey: string | undefined = this._selectedKey();
    if (!itemKey) {
      return null;
    }

    const index = this._keyToIndexMapping[itemKey];
    const selectedTabId = this._selectedTabId();

    return (
      <div role="tabpanel" aria-labelledby={selectedTabId}>
        {React.Children.toArray(this.props.children)[index]}
      </div>
    );
  };

  private _selectedKey(): string | undefined {
    if (this._isKeyValid(this.props.selectedKey)) {
      return this.props.selectedKey!;
    }
    if (this._isKeyValid(this.state.selectedKey)) {
      return this.state.selectedKey;
    }
    if (this._links.length) {
      return this._links[0].itemKey!;
    }
  }

  private _isItemSelected(itemKey: string | undefined): boolean {
    return this._selectedKey() === itemKey;
  }

  private _selectedTabId(): string | undefined {
    const selectedKey = this._selectedKey();
    if (selectedKey) {
      return this._keyToTabIds[selectedKey];
    }
    return undefined;
  }

  /**
   * Gets the set of PivotLinks as arrary of IPivotItemProps
   * The set of Links is determined by child components of type PivotItem
   */
  private _updatePivotLinks(): void {
    const links: IPivotItemProps[] = [];
    this._keyToIndexMapping = {};
    this._keyToTabIds = {};

    if (this.props && this.props.children) {
      React.Children.map(this.props.children, (child: any, index: number) => {
        if (typeof child === 'object' && child.type === PivotItemType) {
          const pivotItem = child as PivotItem;
          const itemKey = pivotItem.props.itemKey || index.toString();

          links.push({
            headerText: pivotItem.props.headerText || pivotItem.props.linkText,
            headerButtonProps: pivotItem.props.headerButtonProps,
            ariaLabel: pivotItem.props.ariaLabel,
            itemKey: itemKey,
            itemCount: pivotItem.props.itemCount,
            itemIcon: pivotItem.props.itemIcon,
            onRenderItemLink: pivotItem.props.onRenderItemLink,
            keytipProps: pivotItem.props.keytipProps
          });
          this._keyToIndexMapping[itemKey] = index;
          this._keyToTabIds[itemKey] = this._getTabId(itemKey, index);
        } else {
          warn('The children of a Pivot component must be of type PivotItem to be rendered.');
        }
      });
    }

    this._links = links;
  }

  /**
   * Generates the Id for the tab button.
   */
  private _getTabId(itemKey: string, index: number): string {
    if (this.props.getTabId) {
      return this.props.getTabId(itemKey, index);
    }

    return this._pivotId + `-Tab${index}`;
  }

  /**
   * whether the key exists in the pivot items.
   */
  private _isKeyValid(itemKey: string | undefined): boolean {
    return itemKey !== undefined && this._keyToIndexMapping[itemKey] !== undefined;
  }

  /**
   * Handles the onClick event on PivotLinks
   */
  private _onLinkClick(itemKey: string, ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    this._updateSelectedItem(itemKey, ev);
  }

  /**
   * Handle the onKeyPress eventon the PivotLinks
   */
  private _onKeyPress(itemKey: string, ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which === KeyCodes.enter) {
      ev.preventDefault();
      this._updateSelectedItem(itemKey);
    }
  }

  /**
   * Updates the state with the new selected index
   */
  private _updateSelectedItem(itemKey: string, ev?: React.MouseEvent<HTMLElement>): void {
    this.setState({
      selectedKey: itemKey
    } as IPivotState);

    if (this.props.onLinkClick && this._keyToIndexMapping[itemKey] >= 0) {
      const index = this._keyToIndexMapping[itemKey];

      // React.Element<any> cannot directly convert to PivotItem.
      const item = React.Children.toArray(this.props.children)[index] as any;

      if (typeof item === 'object' && item.type === PivotItemType) {
        this.props.onLinkClick(item as PivotItem, ev);
      }
    }
  }

  private _getClassNames(props: IPivotProps): { [key in keyof IPivotStyles]: string } {
    const { theme } = props;
    const rootIsLarge: boolean = props.linkSize === PivotLinkSize.large;
    const rootIsTabs: boolean = props.linkFormat === PivotLinkFormat.tabs;

    return getClassNames(props.styles!, {
      theme: theme!,
      rootIsLarge,
      rootIsTabs
    });
  }
}
