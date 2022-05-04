<template>
  <BaseTextarea
    id="input"
    v-model="state.input"
    label="Input"
  />
  <BaseCheckbox
    id="remove-citations"
    v-model="state.removeCitations"
    label="Remove Citations"
  />
  <BaseCheckbox
    id="remove-parentheticals"
    v-model="state.removeParentheticals"
    label="Remove Parentheticals"
  />
  <BaseTextarea
    id="output"
    label="Output"
    :model-value="parsedInput"
    readonly
  />
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';

const state = reactive({
  input: '',
  removeCitations: true,
  removeParentheticals: true,
});

const parsedInput = computed(() => {
  let parsed = state.input;

  if (state.removeCitations) {
    parsed = parsed.replace(/\[[^\]*]\]/gm, '');
  }

  if (state.removeParentheticals) {
    parsed = parsed.replace(/\([^)]*\)/gm, '');
  }

  // Fix orphaned commas
  parsed = parsed.replace(/ ,/gm, ',');

  // Trim consecutive whitespace
  parsed = parsed.replace(/ {2}/gm, ' ');

  return parsed.trim();
});
</script>