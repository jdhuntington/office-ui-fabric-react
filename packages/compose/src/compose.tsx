import * as React from 'react';
import jss from 'jss';
import { useTheme } from './theme';

const resolveWith = (func: any, obj: any) => (typeof func === 'function' ? func(obj) : func);

const _resolveRecipes = (styles: any, theme: any) => {
  const target: any = {};

  // tslint:disable-next-line: forin
  for (const name in styles) {
    const value = resolveWith(styles[name], theme);

    if (typeof value === 'object') {
      target[name] = _resolveRecipes(value, theme);
    } else {
      target[name] = value;
    }
  }

  return target;
};

function merge(a: any, b: any, c: any) {
  return { ...a, ...b, ...c };
}

const _getClasses = ({ theme, name, optionsSet }: any) => {
  const { components = {} } = theme;

  let tokens: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.tokens && typeof options.tokens === 'function') {
      tokens = merge({}, tokens, options.tokens(theme));
    }
  });

  let styles: any = {};
  optionsSet.forEach((options: any) => {
    if (options && options.styles && typeof options.styles === 'function') {
      styles = merge({}, styles, options.styles(theme, tokens));
    }
  });
  /*
  optionsSet.forEach((options: any) => {
    const { tokens: themedTokens = {} } = components[options.name] || {};
    const optionsTokens = _resolveRecipes(options.tokens, theme);
    console.log({ where: 'Inside optionsSet.forEach', optionsTokens, options });
    // tslint:disable-next-line: forin
    for (const key in optionsTokens) {
      tokens[key] = optionsTokens[key];
    }

    const themedTokens1 = _resolveRecipes(themedTokens, theme);
    // tslint:disable-next-line: forin
    for (const key in themedTokens1) {
      tokens[key] = themedTokens1[key];
    }
  });  */

  // optionsSet.forEach((options: any) => {
  //   if (options.styles) {
  //     const { styles: themedStyles = {} } = components[options.name] || {};

  //     styles = merge(
  //       styles,
  //       _resolveRecipes(resolveWith(options.styles, tokens), theme),
  //       _resolveRecipes(resolveWith(themedStyles, tokens), theme)
  //     );
  //   }
  // });

  // Create a stylesheet for this permutation.
  const sheet = jss.createStyleSheet(styles, {
    classNamePrefix: name + '-'
  });
  sheet.attach();

  return sheet.classes;
};

// tslint:disable-next-line: interface-name
export interface ComposedOptions {
  styles: any;
  tokens: any;
  name: string;
  slots: any;
  slotProps: any;
}

/*
# Notes

A RedCheckbox scenario:

Derived from Checkbox, with token overrides.

Expectation:

Checkbox renders classNames as a function of its tokens.
The styles for those classnames are in position 1 in the HEAD.

RedCheckbox, being a derivative of Checkbox, will reuse those classnames at zero cost (we can't avoid it), when
calling the render of its parent. However, to respect new token overrides, we would need to regenerate styles
with greater specificity and append the new ones as well. That is, the RedCheckbox IS also a Checkbox.

The new token values of RedCheckbox should be evaluated separately with a higher prescedence. Evaling
the classnames for RedCheckbox.

From a theming scenario, targetting a Checkbox should affect the base, but not the Red, directly. Example:

A theme targets a Checkbox (theme cb tokens) and a RedCheckbox (theme rcb tokens).
Both of them have their own default tokens (def cb tokens and def rcb tokens).

Mixing order before evaluating styles would be:

def cb tokens, theme cb tokens, def rcb tokens, theme rcb tokens.

This requires that RCB evaluate its entire stack of tokens first. Then, use that to evaluate a layered set of styles
Then apply those classnames. This should acheive the expected result.

*/
export const compose = (Component: React.FunctionComponent) => {
  return (options: Partial<ComposedOptions>) => {
    /** Factory processing time; this is a one-time evaluation, so we can do a bit more expensive work here  */
    const classNamesCache = new WeakMap();
    const optionsSet = [...((Component as any).__optionsSet || []), options];
    const name = options.name || Component.displayName || (Component as any).name;

    Component = (Component as any).__parentComponent || Component;

    const Result = (props: any) => {
      /**
       * Render time; this will happen VERY VERY frequently in the runtime app, and must be as fast as possible
       * doing the least amount of work.
       */
      const theme = useTheme();

      if (!classNamesCache.has(theme)) {
        classNamesCache.set(theme, _getClasses({ theme, name, optionsSet }));
      }

      const { slots, slotProps, ...rest } = props;

      return Component({
        ...rest,
        classes: classNamesCache.get(theme)
      });
    };

    Result.__optionsSet = optionsSet;
    Result.__parentComponent = Component;
    Result.displayName = name;

    return Result;
  };
};
