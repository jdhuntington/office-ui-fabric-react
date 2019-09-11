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

<codesnippet 001BasicButton />

Nothing to see here. Let's make it marginally more exciting.

<codesnippet 002DisablableButton />

## The 1 thing we need to do

In order to make this component play well with themes/tokens/styles in the future is to respect class names that are
passed as a prop. We should expect `classes` to be a mapping from root states to class names. Our 1 job as a component is
to make sure and apply the classes in the right cases.

<codesnippet 003ButtonWithClassNames />

## Bringing in a theme

Theme, styles, and tokens are applied with the help of the `compose` method.

<codesnippet 010ThemedButton />

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

<codesnippet 011TokenedButton />
