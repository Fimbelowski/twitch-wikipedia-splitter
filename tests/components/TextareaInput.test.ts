import {
  describe, expect, it, beforeEach, afterEach, vi,
} from 'vitest';
import { mount } from '@vue/test-utils';
import TextareaInput from '@/components/TextareaInput.vue';

describe('TextareaInput.vue', () => {
  const props = {
    id: 'id',
    label: 'label',
    modelValue: 'Lorem ipsum...',
    readonly: false,
  };

  let wrapper = mount(TextareaInput, { props });

  beforeEach(() => {
    wrapper = mount(TextareaInput, { props });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render a textarea and a label, where the id and for properties repsectively match', () => {
    const textarea = wrapper.get('textarea');
    const label = wrapper.get('label');

    expect(textarea.attributes('id')).toBe(label.attributes('for'));
  });

  it('should render a label with text equal to the "label" prop', () => {
    const label = wrapper.get('label');

    expect(label.text()).toBe(props.label);
  });

  it('should render a textarea with the readonly attribute when the "readonly" prop is true', async () => {
    await wrapper.setProps({
      readonly: true,
    });
    const textarea = wrapper.get('textarea');

    expect(textarea.attributes('readonly')).not.toBe(undefined);
  });

  it('should emit an "update:modelValue" event when the value of the textarea is changed', async () => {
    const textarea = wrapper.get('textarea');

    await textarea.setValue('Hello World!');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  it('should call document.execCommand() when the copyToClipboard method is called', () => {
    document.execCommand = vi.fn(() => true);

    wrapper.vm.copyToClipboard();

    expect(document.execCommand).toHaveBeenCalled();
  });
});
