// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useButtonState as state } from './Button.state';
import { IButtonProps } from './Button.types';
import { ButtonSlots as slots, ButtonView as view } from './Button.view';

export const BaseButton: React.StatelessComponent<IButtonProps> = composed({
  displayName: 'BaseButton',
  slots,
  state,
  view
});

export default BaseButton;
