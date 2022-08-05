<script setup lang="ts">
import useInputParameters from '@/store/useInputParameters';
import ChunkingBehavior from '@/types/ChunkingBehavior';
import TextareaInput from './TextareaInput.vue';
import CheckboxInput from './CheckboxInput.vue';
import NumberInput from './NumberInput.vue';
import SelectInput from './SelectInput.vue';

const store = useInputParameters();
const chunkingBehaviorOptions = Object.values(ChunkingBehavior);
</script>

<template>
  <div>
    <TextareaInput
      id="input"
      label="Input"
      :model-value="store.input"
      @update:model-value="store.updateInput"
    />
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
