import * as React from 'react';
import { IPivotProps } from './Pivot.types';
import { IPivotItemProps } from './PivotItem.types';
import { getNativeProps, divProperties, KeyCodes } from '@uifabric/utilities';
import * as styles from './Pivot.scss';

export interface IPivotState {
  selectedKey: string | undefined;
}

let val = 0;

const nextItemKey = (): string => {
  return `itemKey-${val++}`;
};

export const Pivot: React.FunctionComponent<IPivotProps> = props => {
  const links: IPivotItemProps[] = [];
  let index = 0;
  React.Children.forEach(props.children, element => {
    if (!React.isValidElement(element)) {
      return;
    }
    if (element && element.props) {
      const link = { ...element.props, index: index++ };
      if (!link.tabId) {
        link.tabId = nextItemKey();
      }
      links.push(link);
    }
  });

  const [selectedKey, setSelectedKey] = React.useState<string | undefined>(
    props.defaultSelectedKey !== undefined
      ? props.defaultSelectedKey
      : links.length > 0 && links[0].itemKey !== undefined
      ? links[0].itemKey
      : undefined
  );
  const _renderLinkContent = (link: IPivotItemProps): JSX.Element => {
    const { itemCount, itemIcon, headerText } = link;
    return (
      <span className={styles.linkContent}>
        {itemIcon !== undefined && <span>{itemIcon}</span>}
        {headerText !== undefined && <span className={styles.text}> {link.headerText}</span>}
        {itemCount !== undefined && <span className={styles.count}> ({itemCount})</span>}
      </span>
    );
  };

  const findItem = (itemKey: string | null | undefined): IPivotItemProps | null => {
    if (!itemKey) {
      return null;
    }
    for (let i = 0; i < links.length; i++) {
      if (itemKey === links[i].itemKey) {
        return links[i];
      }
    }
    return null;
  };

  const _updateSelectedItem = (itemKey: string, ev?: React.MouseEvent<HTMLElement>): void => {
    const item = findItem(itemKey);

    if (item) {
      if (props.onLinkClick) {
        props.onLinkClick(item, ev);
      }
      setSelectedKey(itemKey);
    }
  };

  const _onLinkClick = (itemKey: string, ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    _updateSelectedItem(itemKey, ev);
  };

  const _onKeyPress = (itemKey: string, ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.which === KeyCodes.enter) {
      ev.preventDefault();
      _updateSelectedItem(itemKey);
    }
  };

  const _renderPivotLink = (link: IPivotItemProps): JSX.Element => {
    const { itemKey, headerButtonProps, tabId, onRenderItemLink } = link;
    const itemKeyActual = itemKey!;
    const isSelected: boolean = selectedKey === itemKey;

    const linkContent = onRenderItemLink ? onRenderItemLink(link, _renderLinkContent) : _renderLinkContent(link);

    let contentString = link.headerText || '';
    contentString += link.itemCount ? ' (' + link.itemCount + ')' : '';
    contentString += link.itemIcon ? ' xx' : '';

    return (
      <button
        {...headerButtonProps}
        id={tabId}
        key={itemKey}
        className={[styles.link, isSelected && styles.selected].join(' ')}
        onClick={ev => _onLinkClick(itemKeyActual, ev)}
        onKeyPress={ev => _onKeyPress(itemKeyActual, ev)}
        role="tab"
        aria-selected={isSelected}
        name={link.headerText}
        data-content={contentString}
      >
        {linkContent}
      </button>
    );
  };

  const _renderPivotLinks = () => {
    const items = links.map(_renderPivotLink);
    // TODO add focus zone
    return (
      <div className={styles.root} role="tablist">
        {items}
      </div>
    );
  };

  const _renderPivotItem = (): JSX.Element | null => {
    const item = findItem(selectedKey);
    if (props.headersOnly || !item) {
      return null;
    }
    return (
      <div role="tabpanel" aria-labelledby={item.tabId}>
        {React.Children.toArray(props.children)[(item as any).index]}
      </div>
    );
  };

  const render = () => {
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);

    return (
      <div role="toolbar" {...divProps}>
        {_renderPivotLinks()}
        {_renderPivotItem()}
      </div>
    );
  };
  return render();
};
