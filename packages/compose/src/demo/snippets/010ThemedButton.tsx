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
