import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as qs from 'querystring';
import { ITheme, ThemeProvider } from '@uifabric/react-theming';

const scenarios = require('./scenarios/scenarioList');

initializeIcons();

const div = document.createElement('div');
document.body.appendChild(div);

// TODO: could default to displaying list of scenarios if param is not provided.
const defaultScenarioName = Object.keys(scenarios)[0];
const defaultIterations = 10;

const queryParams = qs.parse(window.location.search.substring(1));
const iterations = queryParams.iterations ? parseInt(queryParams.iterations as string, 10) : defaultIterations;
const scenario = queryParams.scenario ? (queryParams.scenario as string) : defaultScenarioName;

const theme: ITheme = {
  direction: 'ltr',
  colors: {
    background: '#ffffff',
    bodyText: '#ffffff',
    subText: '#ffffff',
    disabledText: '#ffffff',
    brand: { values: [], index: -1 },
    accent: { values: [], index: -1 },
    neutral: { values: [], index: -1 },
    success: { values: [], index: -1 },
    warning: { values: [], index: -1 },
    danger: { values: [], index: -1 }
  },
  fonts: {
    default: '',
    mono: '',
    userContent: ''
  },
  fontSizes: {
    base: 10,
    scale: 10,
    unit: 'px'
  },
  animations: {
    fadeIn: {},
    fadeOut: {}
  },
  spacing: {
    base: 10,
    scale: 10,
    unit: 'px'
  },
  radius: {
    base: 10,
    scale: 10,
    unit: 'px'
  },
  icons: {},
  components: {},
  schemes: {}
};

// TODO: This seems to increase React (unstable_runWithPriority) render consumption from 4% to 72%!
// const ScenarioContent = Array.from({ length: iterations }, () => scenarios[scenario]);

// TODO: Using React Fragments increases React (unstable_runWithPriority) render consumption from 4% to 26%.
// It'd be interesting to root cause why at some point.
// ReactDOM.render(<>{Array.from({ length: iterations }, () => (scenarios[scenario]))}</>, div);
ReactDOM.render(
  <div>
    <ThemeProvider theme={theme}>{Array.from({ length: iterations }, () => scenarios[scenario])}</ThemeProvider>
  </div>,
  div
);
