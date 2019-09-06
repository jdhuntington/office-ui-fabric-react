import { useButtonState as state } from './Button.state';
import { IButtonProps } from './Button.types';
import { ButtonSlots as slots, ButtonView as view } from './Button.view';
import { pseudoComposed } from '../../utilities/PseudoCompose';

export const BaseButton: React.StatelessComponent<IButtonProps> = pseudoComposed({
  displayName: 'BaseButton',
  slots,
  state,
  view
});

export default BaseButton;
