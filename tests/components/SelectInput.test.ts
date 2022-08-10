import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';
import { mount } from '@vue/test-utils';

import SelectInput from '@/components/SelectInput.vue';

describe('SelectInput.vue', () => {
  const props = {
    id: 'id',
    label: 'label',
    modelValue: 'a',
    options: ['a', 'b', 'c'],
  };

  let wrapper = mount(SelectInput, { props });

  beforeEach(() => {
    wrapper = mount(SelectInput, { props });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render a select and a label where the id and for properties respectively match', () => {
    const select = wrapper.get('select');
    const label = wrapper.get('label');

    expect(select.attributes('id')).toBe(label.attributes('for'));
  });

  it('should render a label with text equal to the "label" prop', () => {
    const label = wrapper.get('label');

    expect(label.text()).toBe(props.label);
  });

  it('should render an option for each element in the "options" prop', () => {
    const options = wrapper.findAll('option');

    expect(options).toHaveLength(props.options.length);
  });

  it('should render options with value attributes corresponding to the values of the "options" prop', () => {
    const options = wrapper.findAll('option');
    const optionValues = options.map((option) => option.attributes('value'));

    expect(optionValues).toStrictEqual(props.options);
  });

  it('should render options with text corresponding to the value of the "options" prop', () => {
    const options = wrapper.findAll('option');
    const optionTexts = options.map((option) => option.text());

    expect(optionTexts).toStrictEqual(props.options);
  });

  it('should emit an "update:modelValue" event when the value of the select is changed.', async () => {
    const select = wrapper.get('select');

    await select.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });
});
