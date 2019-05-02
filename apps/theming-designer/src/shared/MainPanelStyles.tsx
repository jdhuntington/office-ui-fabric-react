import { mergeStyles } from '@uifabric/merge-styles';

export const MainPanelWidth = '1100px';
export const MainPanelContentWrapper = mergeStyles();
export const MainPanelInnerContent = mergeStyles({
  marginRight: 'auto',
  marginLeft: 'auto',
  padding: '32px',
  width: MainPanelWidth
});
