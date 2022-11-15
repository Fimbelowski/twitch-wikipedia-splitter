<script setup lang="ts">
import CheckboxInput from './CheckboxInput.vue';
import ChunkingBehavior from '@/types/ChunkingBehavior';
import NumberInput from './NumberInput.vue';
import SelectInput from './SelectInput.vue';
import TextareaInput from './TextareaInput.vue';
import useInputParameters from '@/store/useInputParameters';

const store = useInputParameters();
const chunkingBehaviorOptions = Object.values(ChunkingBehavior);
</script>

<template>
  <TextareaInput
    id="input"
    label="Input"
    :model-value="store.input"
    @update:model-value="store.updateInput"
  />
  <div class="input-section__options">
    <CheckboxInput
      id="remove-citations"
      label="Remove Citations"
      :model-value="store.removeCitations"
      @update:model-value="store.updateRemoveCitations"
    />
    <CheckboxInput
      id="remove-line-terminators"
      label="Remove Line Terminators"
      :model-value="store.removeLineTerminators"
      @update:model-value="store.updateRemoveLineTerminators"
    />
    <CheckboxInput
      id="remove-parentheticals"
      label="Remove Parentheticals"
      :model-value="store.removeParentheticals"
      @update:model-value="store.updateRemoveParentheticals"
    />
    <NumberInput
      id="max-chunk-size"
      label="Maximum Chunk Size"
      :min="1"
      :model-value="store.maxChunkSize"
      @update:model-value="store.updateMaxChunkSize"
    />
    <SelectInput
      id="chunking-behavior"
      label="Chunking Behavior"
      :options="chunkingBehaviorOptions"
      :model-value="store.chunkingBehavior"
      @update:model-value="store.updateChunkingBehavior"
    />
    <NumberInput
      id="balking-distance"
      label="Balking Distance"
      :max="499"
      :min="1"
      :model-value="store.balkingDistance"
      @update:model-value="store.updateBalkingDistance"
    />
  </div>
</template>

<style lang="scss">
.input-section {
  &__options {
    grid-column: input-start / input-end;
    grid-row: 2 / 3;
  }
}
</style>
