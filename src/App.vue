<script setup lang="ts">
import { reactive } from 'vue';
import BaseTextarea from './components/BaseTextarea.vue';
import CheckboxInput from './components/CheckboxInput.vue';
import NumberInput from './components/NumberInput.vue';

const inputState = reactive({
  input: '',
  removeCitations: true,
  removeLineTerminators: true,
  removeParentheticals : true,
  maxChunkSize: 500,
});
</script>

<template>
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
</template>
