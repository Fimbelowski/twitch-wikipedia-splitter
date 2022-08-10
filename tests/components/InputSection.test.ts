import {
  describe, expect, it, beforeEach, afterEach,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import InputSection from '@/components/InputSection.vue';
import useInputParameters from '@/store/useInputParameters';

describe('InputSection.vue', () => {
  let wrapper = mount(InputSection, {
    global: {
      plugins: [
        createTestingPinia(),
      ],
    },
  });

  beforeEach(() => {
    wrapper = mount(InputSection, {
      global: {
        plugins: [
          createTestingPinia(),
        ],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should call updateInput when the "Input" textarea is changed', async () => {
    const inputParameters = useInputParameters();
    const textarea = wrapper.get('textarea');

    await textarea.trigger('input');

    expect(inputParameters.updateInput).toHaveBeenCalledOnce();
  });

  it('should call updateRemoveCitations when the "Remove Citations" checkbox is changed', async () => {
    const inputParameters = useInputParameters();
    const checkbox = wrapper.get('input#remove-citations');

    await checkbox.trigger('change');

    expect(inputParameters.updateRemoveCitations).toHaveBeenCalledOnce();
  });

  it('should call updateRemoveLineTerminators when the "Remove Line Terminators" checkbox is changed', async () => {
    const inputParameters = useInputParameters();
    const checkbox = wrapper.get('input#remove-line-terminators');

    await checkbox.trigger('change');

    expect(inputParameters.updateRemoveLineTerminators).toHaveBeenCalledOnce();
  });

  it('should call updateRemoveParentheticals when the "Remove Parentheticals" checkbox is changed', async () => {
    const inputParameters = useInputParameters();
    const checkbox = wrapper.get('input#remove-parentheticals');

    await checkbox.trigger('change');

    expect(inputParameters.updateRemoveParentheticals).toHaveBeenCalledOnce();
  });

  it('should call updateMaxChunkSize when the "Chunk Size" input has been changed', async () => {
    const inputParameters = useInputParameters();
    const input = wrapper.get('input#max-chunk-size');

    await input.trigger('input');

    expect(inputParameters.updateMaxChunkSize).toHaveBeenCalledOnce();
  });

  it('should call updateChunkingBehavior when the "Chunking Behavior" select has been changed', async () => {
    const inputParameters = useInputParameters();
    const select = wrapper.get('select');

    await select.trigger('input');

    expect(inputParameters.updateChunkingBehavior).toHaveBeenCalledOnce();
  });

  it('should call updateBalkingDistance when the "Balking Distance" input has been changed', async () => {
    const inputParameters = useInputParameters();
    const input = wrapper.get('input#balking-distance');

    await input.trigger('input');

    expect(inputParameters.updateBalkingDistance).toHaveBeenCalledOnce();
  });
});
