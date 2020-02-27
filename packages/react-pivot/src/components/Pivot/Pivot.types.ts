import * as React from 'react';
import { IRefObject } from '@uifabric/utilities';
import { IPivotItemProps } from './PivotItem.types';

/**
 * {@docCategory Pivot}
 */
export interface IPivot {
  /**
   * Sets focus to the first pivot tab.
   */
  focus(): void;
}

/**
 * {@docCategory Pivot}
 */
export interface IPivotProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IPivot interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IPivot>;

  /**
   * Additional css class to apply to the Pivot
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Default selected key for the pivot. Only provide this if the pivot is an uncontrolled component;
   * otherwise, use the `selectedKey` property.
   *
   * This property is also mutually exclusive with `defaultSelectedIndex`.
   */
  defaultSelectedKey?: string;

  /**
   * Default selected index for the pivot. Only provide this if the pivot is an uncontrolled component;
   * otherwise, use the `selectedKey` property.
   *
   * This property is also mutually exclusive with `defaultSelectedKey`.
   */
  defaultSelectedIndex?: number;

  /**
   * Index of the pivot item initially selected. Mutually exclusive with `initialSelectedKey`.
   * Only provide this if the pivot is an uncontrolled component; otherwise, use `selectedKey`.
   *
   * @deprecated Use `defaultSelectedIndex`
   */
  initialSelectedIndex?: number;

  /**
   * Key of the pivot item initially selected. Mutually exclusive with `initialSelectedIndex`.
   * Only provide this if the pivot is an uncontrolled component; otherwise, use `selectedKey`.
   *
   * @deprecated Use `defaultSelectedKey`
   */
  initialSelectedKey?: string;

  /**
   * Key of the selected pivot item. Updating this will override the Pivot's selected item state.
   * Only provide this if the pivot is a controlled component where you are maintaining the
   * current state; otherwise, use `defaultSelectedKey`.
   */
  selectedKey?: string | null;

  /**
   * Callback for when the selected pivot item is changed.
   */
  onLinkClick?: (item?: IPivotItemProps, ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * PivotLinkSize to use (normal, large)
   */
  linkSize?: PivotLinkSize;

  /**
   * PivotLinkFormat to use (links, tabs)
   */
  linkFormat?: PivotLinkFormat;

  /**
   * Whether to skip rendering the tabpanel with the content of the selected tab.
   * Use this prop if you plan to separately render the tab content
   * and don't want to leave an empty tabpanel in the page that may confuse Screen Readers.
   */
  headersOnly?: boolean;

  /**
   * Callback to customize how IDs are generated for each tab header.
   * Useful if you're rendering content outside and need to connect aria-labelledby.
   */
  getTabId?: (itemKey: string, index: number) => string;
}

/**
 * {@docCategory Pivot}
 */
export enum PivotLinkFormat {
  /**
   * Display Pivot Links as links
   */
  links = 0,

  /**
   * Display Pivot Links as Tabs
   */
  tabs = 1
}

/**
 * {@docCategory Pivot}
 */
export enum PivotLinkSize {
  /**
   * Display Link using normal font size
   */
  normal = 0,

  /**
   * Display links using large font size
   */
  large = 1
}
