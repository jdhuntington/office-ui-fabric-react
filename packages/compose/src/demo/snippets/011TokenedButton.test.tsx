import { shallow, mount } from 'enzyme';
import * as React from 'react';

import { MyRedButton } from './011TokenedButton';

describe('011 Tokened Button', () => {
  it('is rendered with classNames', () => {
    const wrapper = mount(<MyRedButton />);
    expect(wrapper.getDOMNode()).toHaveProperty('className');
  });
});
