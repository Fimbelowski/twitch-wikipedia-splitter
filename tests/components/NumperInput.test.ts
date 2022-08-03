import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import NumberInput from '../../src/components/NumberInput.vue';

describe('NumberInput.vue', () => {
  const props = {
    id: 'id',
    label: 'label',
    max: 100,
    min: 1,
    modelValue: 1,
  };

  let wrapper = mount(NumberInput, { props });
  
  beforeEach(() => {
    wrapper = mount(NumberInput, { props });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render an input of type "number"', () => {
    const input = wrapper.get('input');

    expect(input.attributes('type')).toBe('number');
  });

  it('should render an input and a label, where the id and for properties respectively match', () => {
    const input = wrapper.get('input');
    const label = wrapper.get('label');

    expect(input.attributes('id')).toBe(label.attributes('for'));
  });

  it('should render a label with text equal to the "label" prop', () => {
    const label = wrapper.get('label');

    expect(label.text()).toBe(props.label);
  });

  it('should render an input with a "max" attribute equal to the "max" prop', () => {
    const input = wrapper.get('input');

    expect(input.attributes('max')).toBe(props.max.toString());
  });

  it('should render an input with a "min" attribute equal to the "min" prop', () => {
    const input = wrapper.get('input');

    expect(input.attributes('min')).toBe(props.min.toString());
  });

  it('should emit an "update:modelValue" event when the value of the input is changed', async () => {
    const input = wrapper.get('input');

    await input.setValue(2);

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });
});