// tslint:disable:no-any
import { AppCustomizations } from './customizations';

export const AppDefinition: any = {
  appTitle: 'UI Fabric - Experiments',
  customizations: AppCustomizations,
  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('./snippets/001BasicButtonUsage').Usage,
          key: '001BasicButton',
          name: '001 Basic Button',
          url: '#/examples/001BasicButton'
        },
        {
          component: require<any>('./snippets/002DisablableButtonUsage').Usage,
          key: '002DisablableButton',
          name: '002 Disablable Button',
          url: '#/examples/002DisablableButton'
        },
        {
          component: require<any>('./snippets/003ButtonWithClassNamesUsage').Usage,
          key: '003ButtonWithClassNames',
          name: '003 Button With Class Names',
          url: '#/examples/003ButtonWithClassNames'
        },
        {
          component: require<any>('./snippets/010ThemedButtonUsage').Usage,
          key: '010ThemedButton',
          name: '010 Themed Button',
          url: '#/examples/010ThemedButton'
        }
      ]
    }
  ],
  headerLinks: [
    {
      name: 'Getting started',
      url: '#/'
    },
    {
      name: 'Fabric',
      url: 'https://dev.microsoft.com/fabric'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/OfficeDev/office-ui-fabric-react'
    }
  ]
};
