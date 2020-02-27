import * as React from 'react';
import { IRenderFunction } from '@uifabric/utilities';

/**
 * {@docCategory Pivot}
 */
export interface IPivotItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The text displayed of each pivot link - renaming to `headerText`.
   * @deprecated Use `headerText` instead.
   */
  linkText?: string;

  /**
   * The text displayed of each pivot link.
   */
  headerText?: string;

  tabId?: string;

  /**
   * Props for the header command button supporting native props - data-* and aria-* - for each pivot header/link element
   */
  headerButtonProps?: { [key: string]: string | number | boolean };

  /**
   * An required key to uniquely identify a pivot item.
   *
   * Note: The 'key' from react props cannot be used inside component.
   */
  itemKey: string;

  /**
   * The aria label of each pivot link which will read by screen reader instead of linkText.
   *
   * Note that unless you have compelling requirements you should not override aria-label.
   */
  ariaLabel?: string;

  /**
   * Defines an optional item count displayed in parentheses just after the `linkText`.
   *
   * Examples: completed (4), Unread (99+)
   */
  itemCount?: number | string;

  /**
   * An optional icon to show next to the pivot link.
   */
  itemIcon?: string;

  /**
   * Optional custom renderer for the pivot item link
   */
  onRenderItemLink?: IRenderFunction<IPivotItemProps>;
}
