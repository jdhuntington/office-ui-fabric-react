import { MyThemedButton } from './010ThemedButton';
import { compose } from '../../compose';

// Hardcoding to `red` isn't a great idea, but
// kept for a simple token example.
const myRedButtonTokens = {
  backgroundColor: 'red'
};

export const MyRedButton = compose(MyThemedButton)({
  name: 'MyRedButton',
  tokens: () => myRedButtonTokens
});
