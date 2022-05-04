<template>
  <div
    class="text-splitter__container"
  >
    <div
      class="text-splitter__input"
    >
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
    </div>
    <div
      class="text-splitter__output"
    >
      <BaseTextarea
        id="output"
        label="Output"
        :model-value="parsedInput"
        readonly
      />
    </div>
  </div>
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

<style>
.text-splitter__container {
  display: flex;
  margin-top: 25px;
}

.text-splitter__input {
  margin-right: 25px;
}
</style>