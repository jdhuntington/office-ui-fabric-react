import { FluentTheme } from '@uifabric/fluent-theme';
import { ISlottableProps, IStyleableComponentProps, ValidProps } from '@uifabric/foundation';
import { IComponentOptions, IRecompositionComponentOptions } from '@uifabric/foundation/lib/next/IComponent';
import { IFoundationComponent } from '@uifabric/foundation/lib/next/ISlots';
import { IStyleSet, ITheme } from '@uifabric/styling';
import jss from 'jss';
import preset from 'jss-preset-default';
import * as React from 'react';

import { pseudoComposed } from '../utilities/PseudoCompose';

const Theme = React.createContext<ITheme | undefined>(undefined);

jss.setup(preset());

export function composedJss<
  TComponentProps extends ValidProps & ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps extends TComponentProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {}
>(
  baseComponentOrOptions:
    | IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>
    | IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> = {},
  recompositionOptions?: IRecompositionComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>
): IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> & TStatics {
  let options: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>;
  if (typeof baseComponentOrOptions === 'function' && baseComponentOrOptions.__options) {
    const baseComponentOptions = baseComponentOrOptions.__options;

    options = {
      ...baseComponentOptions,
      ...recompositionOptions,
      slots: undefined
    };
  } else {
    options = baseComponentOrOptions;
  }
  const base = pseudoComposed(baseComponentOrOptions, recompositionOptions);
  const wrapped = buildJssComponent(options, base);
  return wrapped as IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> & TStatics;
}

type IClassNameMap = { [slot: string]: string };

const _resolveRecipes = (styles: any, theme: any) => {
  const target = {};

  for (let name in styles) {
    let value = styles[name];

    if (typeof value === 'function') {
      value = styles[name] = styles[name](theme);
    }

    if (typeof value === 'object') {
      (target as any)[name] = _resolveRecipes(styles[name], theme);
    } else {
      (target as any)[name] = value;
    }
  }

  return target;
};

const _resolveWith = (objOrFunc: any, data: any[]) => (typeof objOrFunc === 'function' ? objOrFunc(...data) : objOrFunc);

const _resolve = ({ name, styles, theme, tokens }: any): IClassNameMap => {
  const { components = {} } = theme;
  const themeSettings = components[name] || {};

  tokens = {
    ..._resolveWith(tokens, [theme]),
    ..._resolveWith(themeSettings.tokens, [theme])
  };

  let mergedStyles = {};
  mergedStyles = { ...mergedStyles, ..._resolveRecipes(_resolveWith(styles, [theme, tokens]), theme) };
  mergedStyles = { ...mergedStyles, ..._resolveRecipes(_resolveWith(themeSettings.styles, [theme, tokens]), theme) };
  return mergedStyles;
};

function buildJssComponent<
  TComponentProps extends ValidProps & ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps extends TComponentProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {}
>(
  options: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>,
  view: IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>
): IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> {
  const classNamesCache = new WeakMap();
  return (
    componentProps: TViewProps &
      IStyleableComponentProps<TViewProps, TTokens, TStyleSet> & {
        children?: React.ReactNode;
      }
  ) => {
    const contextTheme = React.useContext(Theme);
    const theme = contextTheme || FluentTheme;
    let classes: IClassNameMap;
    if (classNamesCache.has(theme)) {
      classes = classNamesCache.get(theme);
    } else {
      const { tokens, styles, displayName } = options;
      const resolvedStyles = _resolve({
        name: displayName,
        tokens,
        styles,
        theme
      });
      const sheet = jss.createStyleSheet(resolvedStyles as any, {
        classNamePrefix: `${displayName}-`
      });
      sheet.attach();
      classNamesCache.set(theme, sheet.classes);
      classes = sheet.classes;
    }
    return view({ ...componentProps, classes, rootClassName: classes.root });
  };
}
