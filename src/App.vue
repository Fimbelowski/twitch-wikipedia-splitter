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
    <ol>
      <li
        v-for="(chunk, index) in chunkedParsedInput"
        :key="index"
        style="max-width: 350px"
      >
        {{ chunk }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import removeParentheticals from '../src/helpers/removeParentheticals';

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
    parsed = removeParentheticals(parsed);
  }

  // Fix orphaned punctuation
  parsed = parsed.replace(/ ([.,])/gm, '$1');

  // Trim consecutive whitespace
  parsed = parsed.replace(/ {2}/gm, ' ');

  return parsed.trim();
});

const chunkedParsedInput = computed(() => {
  if (parsedInput.value.length === 0) {
    return [''];
  }

  let remainingParsedInput = parsedInput.value;
  const chunks: string[] = [];

  while (remainingParsedInput.length > 0) {
    if (remainingParsedInput.length > 500) {
      let substring = remainingParsedInput.substring(0, 500);

      const end = substring.lastIndexOf(' ');
      chunks.push(substring.substring(0, end));
      remainingParsedInput = remainingParsedInput
        .substring(end)
        .trim();
    } else {
      chunks.push(remainingParsedInput);
      break;
    }
  }

  return chunks;
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
