# So you want to build a Button

Let's start from scratch and build a `Button` that can be a first class citizen in Fabric 8.

First, a few fundamentals.

In talking to and working with other teams, it's clear that it is necessary to
separate the functionality of a control from the look and feel. In previous versions of Fabric this has been
the case at the file level, but not at the package level. Going forward, we aim to make it possible for
developers to use Fabric components and apply wildly different theming/styling rules to achieve their intended
goal. React Native, CSS (with variables), and CSS-in-JSS are all things that should be supported by a basic
component.

Second, writing a base control should _feel_ natural to a developer familiar with React. Bringing a component
along to exist in the Fabric ecosystem should be a trivial exercise for a well-written component.

## Let's start right out

**HEY WHA HAPPENED?**

Let's build a button component using vanilla React.

```
import * as React from 'react';

// tslint:disable-next-line: interface-name
interface MyButtonProps {
  children?: any;
}

export const MyButton: React.FunctionComponent<MyButtonProps> = (props: MyButtonProps) => {
  return <button>{props.children}</button>;
};

```

[demo](#/examples/001BasicButton)

Nothing to see here. Let's make it marginally more exciting.

```
import * as React from 'react';

// tslint:disable-next-line: interface-name
interface MyButtonProps {
  children?: any;
  disabled?: boolean;
}

export const MyButton: React.FunctionComponent<MyButtonProps> = (props: MyButtonProps) => {
  return <button disabled={props.disabled}>{props.children}</button>;
};

```

[demo](#/examples/002DisablableButton)

## The 1 thing we need to do

In order to make this component play well with themes/tokens/styles in the future is to respect class names that are
passed as a prop. We should expect `classes` to be a mapping from root states to class names. Our 1 job as a component is
to make sure and apply the classes in the right cases.

```
import * as React from 'react';

// tslint:disable-next-line: interface-name
interface MyButtonProps {
  children?: any;
  disabled?: boolean;
  classes?: {
    root?: string;
    rootDisabled?: string;
  };
}

export const MyButton: React.FunctionComponent<MyButtonProps> = (props: MyButtonProps) => {
  console.log('MyButton render', props);
  let resolvedClassnames = props.classes && props.classes.root;
  if (props.disabled && props.classes && props.classes.rootDisabled) {
    resolvedClassnames = resolvedClassnames + ' ' + props.classes.rootDisabled;
  }

  return (
    <div>
      <button className={resolvedClassnames} disabled={props.disabled}>
        {props.children}
      </button>
      <pre>{JSON.stringify(props.classes, null, 2)}</pre>
    </div>
  );
};

```

[demo](#/examples/003ButtonWithClassNames)

## Bringing in a theme

Theme, styles, and tokens are applied with the help of the `compose` method.

```
import { MyButton } from './003ButtonWithClassNames';
import { ITheme, FontWeights } from '@uifabric/styling';
import { compose } from '../../compose';

export interface IButtonTokens {
  borderColorPressed: any;
  colorPressed: any;
  colorHovered: any;
  borderColorHovered: any;
  minHeight: any;
  minWidth: any;
  height: any;
  cursor: any;
  color: any;
  borderWidth: any;
  borderStyle: any;
  borderColor: any;
  childrenGap: { rowGap: any; columnGap: any };
  outlineColor: any;
  iconColorHovered: any;
  backgroundColorPressed: any;
  backgroundColor: any;
  borderRadius: any;
  contentPadding: any;
  width: any;
  borderWidthFocused: any;
  textFamily: any;
  textSize: any;
  textWeight: any;
}

type IMyStyles = any;

const ButtonTokens = (theme: ITheme): IButtonTokens => {
  const { effects, semanticColors } = theme;

  return {
    borderRadius: effects.roundedCorner2,
    borderWidthFocused: 3,
    borderStyle: 'solid',
    borderColorPressed: semanticColors.buttonBorder,
    colorPressed: semanticColors.buttonTextPressed,
    colorHovered: semanticColors.buttonTextHovered,
    borderWidth: 1,
    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    color: semanticColors.buttonText,
    iconColorHovered: semanticColors.buttonTextHovered,
    outlineColor: 'transparent',
    backgroundColor: semanticColors.buttonBackground,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,
    height: 30,
    childrenGap: {
      rowGap: 8,
      columnGap: 8
    },
    contentPadding: '0px 20px',
    cursor: 'pointer',
    minHeight: 32,
    minWidth: 100,
    width: undefined,
    textFamily: 'inherit',
    textSize: 14,
    textWeight: FontWeights.semibold
  };
};

const ButtonStyles = (theme: ITheme, tokens: IButtonTokens): IMyStyles => {
  const { rowGap, columnGap } = tokens.childrenGap;

  return {
    root: {
      alignItems: 'center',
      backgroundColor: tokens.backgroundColor,
      borderColor: tokens.borderColor,
      borderRadius: tokens.borderRadius,
      borderStyle: tokens.borderStyle,
      borderWidth: tokens.borderWidth,
      boxSizing: 'border-box',
      color: tokens.color,
      cursor: tokens.cursor,
      display: 'inline-flex',
      flexDirection: 'row',
      fontSize: tokens.textSize,
      fontWeight: tokens.textWeight,
      height: tokens.height,
      justifyContent: 'center',
      margin: 0,
      minWidth: tokens.minWidth,
      minHeight: tokens.minHeight,
      outlineColor: tokens.outlineColor,
      overflow: 'hidden',
      padding: tokens.contentPadding,
      textAlign: 'center',
      textDecoration: 'none',
      userSelect: 'none',
      verticalAlign: 'baseline',
      width: tokens.width,

      '& > *': {
        marginLeft: `${0.5 * rowGap.value}${rowGap.unit} ${0.5 * columnGap.value}${columnGap.unit}`,
        textOverflow: 'ellipsis'
      },
      '& > *:not(:first-child)': {
        marginLeft: `${columnGap.value}${columnGap.unit}`
      },

      '&:hover': {
        backgroundColor: tokens.backgroundColorPressed,
        borderColor: tokens.borderColorHovered,
        color: tokens.colorHovered
      },
      '&:active': {
        backgroundColor: tokens.backgroundColorPressed,
        borderColor: tokens.borderColorPressed,
        color: tokens.colorPressed
      }
    },
    content: {
      fontFamily: tokens.textFamily,
      fontSize: tokens.textSize,
      fontWeight: tokens.textWeight,
      overflow: 'visible'
    }
  };
};

export const MyThemedButton = compose(MyButton)({
  name: 'MyThemedButton',
  styles: ButtonStyles,
  tokens: ButtonTokens
});

```

[demo](#/examples/010ThemedButton)

Under the hood, `compose` is quite simple. It performs the following steps:

- Look for an `ITheme` in the context
- Call the provided `tokens` method
- Pass the result of `token` to the `styles` method (along with the theme)
- Take the result of `styles` and generate `classNames`
- Returns a component that will supply `classNames`

## Why tokens?

In contrast to other iterations, the tokens method is **not allowed** to access
`props`. With that restriction, a reasonable question is "why have tokens at all?".

In short, tokens allows a developer to build an entirely new control with some very
small changes to the base component, without needing to know any internals.

```
import { MyThemedButton } from './010ThemedButton';
import { compose } from '../../compose';

const myRedButtonTokens = {
  backgroundColor: 'red'
};

export const MyRedButton = compose(MyThemedButton)({
  name: 'MyRedButton',
  tokens: () => myRedButtonTokens
});

```

[demo](#/examples/011TokenedButton)
