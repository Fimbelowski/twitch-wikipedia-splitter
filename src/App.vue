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
      v-model:copy-to-clipboard="state.copySelectedChunk"
      :label="outputLabel"
      :model-value="selectedChunk"
      readonly
    />
    <div
      class="output__controls"
    >
      <button
        :disabled="previousChunkDisabled"
        type="button"
        @click="selectPreviousChunk"
      >
        &lt; Previous
      </button>
      <button
        type="button"
        @click="copyChunkToClipboard"
      >
        Copy Chunk
      </button>
      <button
        :disabled="nextChunkDisabled"
        type="button"
        @click="selectNextChunk"
      >
        Next &gt;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import removeParentheticals from '../src/helpers/removeParentheticals';

const state = reactive({
  copySelectedChunk: false,
  input: '',
  removeCitations: true,
  removeParentheticals: true,
  selectedChunkIndex: 0,
});

watch( // Should also reset selectedChunkIndex when parsedInput is updated
  () => state.input,
  () => {
    state.selectedChunkIndex = 0;
  },
);

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

const selectedChunk = computed(() => chunkedParsedInput.value[state.selectedChunkIndex]);
const previousChunkDisabled = computed(() => state.selectedChunkIndex === 0);
const nextChunkDisabled = computed(() => state.selectedChunkIndex >= chunkedParsedInput.value.length - 1);

const outputLabel = computed(() => `Output (${state.selectedChunkIndex + 1}/${chunkedParsedInput.value.length})`);

function selectPreviousChunk() {
  if (previousChunkDisabled.value) {
    return;
  }

  state.selectedChunkIndex--;
}

function selectNextChunk() {
  if (nextChunkDisabled.value) {
    return;
  }

  state.selectedChunkIndex++;
}

function copyChunkToClipboard() {
  state.copySelectedChunk = true;
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

button {
  padding: 3px;
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

.output__controls {
  display: flex;
  justify-content: space-between;
}
</style>
