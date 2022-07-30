<script setup lang="ts">
import TextareaInput from './TextareaInput.vue';
import CheckboxInput from './CheckboxInput.vue';
import NumberInput from './NumberInput.vue';
import SelectInput from './SelectInput.vue';
import { useInput } from '../store/useInput';
import { ChunkingBehavior } from '../types/ChunkingBehavior';

const store = useInput();
const chunkingBehaviorOptions = Object.values(ChunkingBehavior);
</script>

<template>
  <div>
    <TextareaInput
      id="input"
      label="Input"
      v-model="store.input"
    />
    <CheckboxInput
      id="remove-citations"
      v-model="store.removeCitations"
      label="Remove Citations"
    />
    <CheckboxInput
      id="remove-line-terminators"
      v-model="store.removeLineTerminators"
      label="Remove Line Terminators"
    />
    <CheckboxInput
      id="remove-parentheticals"
      v-model="store.removeParentheticals"
      label="Remove Parentheticals"
    />
    <NumberInput
      id="max-chunk-size"
      v-model="store.maxChunkSize"
      label="Maximum Chunk Size"
      :min="1"
    />
    <SelectInput
      id="chunking-behavior"
      v-model="store.chunkingBehavior"
      label="Chunking Behavior"
      :options="chunkingBehaviorOptions"
    />
    <NumberInput
      id="balking-distance"
      v-model="store.balkingDistance"
      label="Balking Distance"
      :max="499"
      :min="1"
    />
  </div>
</template>