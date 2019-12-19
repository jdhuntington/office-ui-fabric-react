import { ChoiceGroup, DropdownMenuItemType, IDropdownOption, Slider, Dropdown, TextField } from 'office-ui-fabric-react';
import * as React from 'react';

const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' }
];

const scenario = (
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
        },
        {
          key: 'C',
          text: 'Option C',
          disabled: true
        },
        {
          key: 'D',
          text: 'Option D'
        }
      ]}
      label="Pick one"
      required={true}
    />
  </div>
);

export default scenario;
