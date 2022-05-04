<template>
  <div
    class="input"
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
  <div>
    <BaseTextarea
      id="output"
      label="Output"
      :model-value="parsedInput"
      readonly
    />
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
    parsed = parsed.replace(/\[[^\]]*\]/gm, '');
  }

  if (state.removeParentheticals) {
    while (/\((?=.*\))/gm.test(parsed)) {
      const start = parsed.lastIndexOf('(');
      const substring = parsed
        .substring(start)
        .replace(/\([^)]*\)(?: |)/gm, '');

      parsed = `${parsed.substring(0, start)}${substring}`;
    }
  }

  // Fix orphaned commas
  parsed = parsed.replace(/ ,/gm, ',');

  // Trim consecutive whitespace
  parsed = parsed.replace(/ {2}/gm, ' ');

  return parsed.trim();
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  justify-content: center;
  padding-top: 25px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.input {
  margin-right: 25px;
}
</style>
