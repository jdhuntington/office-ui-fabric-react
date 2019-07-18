import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListAdvancedPageProps } from 'office-ui-fabric-react/lib/packages/react-data-views/components/DetailsList/DetailsList.doc';

export const DetailsListAdvancedPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListAdvancedPageProps, ...props }} />
);
