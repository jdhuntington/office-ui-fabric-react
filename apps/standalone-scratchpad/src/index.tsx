import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app';

let _rootDiv: HTMLElement;

function start(): void {
  initializeIcons();

  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(<App />, _rootDiv);
}

// Start the application.
start();
