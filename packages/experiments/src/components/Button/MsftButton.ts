// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';
import { IButtonProps } from './Button.types';
import { BaseButton } from './BaseButton';

export const MsftButton: React.StatelessComponent<IButtonProps> = composed(BaseButton, {
  displayName: 'MsftButton',
  styles,
  tokens
});

export default MsftButton;
