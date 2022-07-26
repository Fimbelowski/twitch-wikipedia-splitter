<script setup lang="ts">
import { reactive } from 'vue';
import BaseTextarea from './components/BaseTextarea.vue';
import CheckboxInput from './components/CheckboxInput.vue';
import NumberInput from './components/NumberInput.vue';
import BaseSelect from './components/BaseSelect.vue';
import { default as ChunkingBehaviors } from './ChunkingBehaviors';

const inputState = reactive({
  input: '',
  removeCitations: true,
  removeLineTerminators: true,
  removeParentheticals : true,
  maxChunkSize: 500,
  chunkingBehavior: ChunkingBehaviors.sentenceBoundary,
  balkingDistance: 100,
});
</script>

<template>
  <div class="input">
    <BaseTextarea
      id="input"
      label="Input"
      v-model="inputState.input"
    />
    <CheckboxInput
      id="remove-citations"
      v-model="inputState.removeCitations"
      label="Remove Citations"
    />
    <CheckboxInput
      id="remove-line-terminators"
      v-model="inputState.removeLineTerminators"
      label="Remove Line Terminators"
    />
    <CheckboxInput
      id="remove-parentheticals"
      v-model="inputState.removeParentheticals"
      label="Remove Parentheticals"
    />
    <NumberInput
      id="max-chunk-size"
      v-model="inputState.maxChunkSize"
      label="Maximum Chunk Size"
      :min="1"
    />
    <BaseSelect
      id="chunking-behavior"
      v-model="inputState.chunkingBehavior"
      label="Chunking Behavior"
      :options="Object.values(ChunkingBehaviors)"
    />
    <NumberInput
      id="balking-distance"
      v-model="inputState.balkingDistance"
      label="Balking Distance"
      :max="499"
      :min="1"
    />
  </div>
</template>
