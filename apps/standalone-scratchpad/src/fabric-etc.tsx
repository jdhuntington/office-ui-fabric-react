import { Breadcrumb, ChoiceGroup, DefaultButton, IBreadcrumbItem, TextField, Checkbox } from 'office-ui-fabric-react';
import * as React from 'react';

const items: IBreadcrumbItem[] = [
  { text: 'Folder 1', key: 'f1' },
  { text: 'Folder 3', key: 'f3' },
  { text: 'Folder 5', key: 'f5', isCurrentItem: true }
];
export const FabricEtc: React.FunctionComponent<{}> = props => {
  return (
    // tslint:disable-next-line:jsx-ban-props
    <div style={{ width: 400 }}>
      <div>
        <ChoiceGroup
          className="defaultChoiceGroup"
          defaultSelectedKey="A"
          options={[
            {
              key: 'A',
              text: 'Option A'
            }
          ]}
        />
      </div>
    </div>
  );
};

/*
return (
    // tslint:disable-next-line:jsx-ban-props
    <div style={{ width: 400 }}>
      <h5>Some Fabric stuff...</h5>
      <div>
        <DefaultButton text="I am a default button" />
      </div>
      <div>
        <TextField value="I am a default textfield" />
      </div>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div>
        <ChoiceGroup
          className="defaultChoiceGroup"
          defaultSelectedKey="B"
          options={[
            {
              key: 'A',
              text: 'Option A'
            },
            {
              key: 'B',
              text: 'Option B'
            }
          ]}
          label="Pick one"
        />
      </div>
      <div>
        <Checkbox label="Checkbox " />
      </div>
    </div>
  );*/
