import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import CheckboxInput from '../../src/components/CheckboxInput.vue';

describe('CheckboxInput.vue', () => {
  const props = {
    id: 'id',
    label: 'label',
    modelValue: false,
  };

  let wrapper = mount(CheckboxInput, { props });

  beforeEach(() => {
    wrapper = mount(CheckboxInput, { props });
  });

  afterEach(() => {
    wrapper.unmount
  });

  it('should render an input and a label, where the id and name properties respectively match', () => {
    const input = wrapper.get('input');
    const label = wrapper.get('label');

    expect(input.attributes('id')).toBe(label.attributes('for'));
  });

  it('should render a label with text equal to the "label" prop', () => {
    const label = wrapper.get('label');

    expect(label.text()).toBe(props.label);
  });

  it('should emit an "update:modelValue" event when the input is changed', async () => {
    const input = wrapper.get('input');

    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });
});