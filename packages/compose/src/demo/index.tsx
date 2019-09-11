import { createDemoApp } from '@uifabric/example-app-base';
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';

import { initializeJss } from '../jss';
import { AppDefinition } from './AppDefinition';
import { GettingStartedPage } from './GettingStartedPage';

initializeJss();
initializeFileTypeIcons();

createDemoApp(AppDefinition, GettingStartedPage);
