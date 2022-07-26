<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import TextareaInput from './components/TextareaInput.vue';
import CheckboxInput from './components/CheckboxInput.vue';
import NumberInput from './components/NumberInput.vue';
import BaseSelect from './components/BaseSelect.vue';
import { default as ChunkingBehaviors } from './types/ChunkingBehaviors';
import { default as removeParentheticals } from './utilities/removeParentheticals';
import { default as chunkText } from './utilities/chunkText';

const inputState = reactive({
  input: '',
  removeCitations: true,
  removeLineTerminators: true,
  removeParentheticals : true,
  maxChunkSize: 500,
  chunkingBehavior: ChunkingBehaviors.sentenceBoundary,
  balkingDistance: 100,
});

const outputTextarea = ref<InstanceType<typeof TextareaInput> | null>(null);

const outputState = reactive({
  autoSelectNextChunkOnCopy: true,
  selectedChunkIndex: 0,
});

watch(
  () => inputState,
  () => {
    outputState.selectedChunkIndex = 0;
  },
  {
    deep: true,
  },
);

const outputLabel = computed(() => `Output (${outputState.selectedChunkIndex + 1}/${chunkedParsedInput.value.length})`);
const selectedChunk = computed(() => chunkedParsedInput.value[outputState.selectedChunkIndex]);

const parsedInput = computed(() => {
  let parsed = inputState.input;

  if (inputState.removeParentheticals) {
    parsed = removeParentheticals(parsed);
  }

  if (inputState.removeCitations) {
    parsed = parsed.replace(/\[[^\]]*\]/gm, '');;
  }

  // Remove line terminators
  parsed = parsed.replace(/[\n\r]/gm, ' ');

  // Trim consecutive spaces
  parsed = parsed.replace(/ {2,}/gm, ' ');

  // Fix orphaned punctuation
  parsed = parsed.replace(/ ([.,])/gm, '$1');

  return parsed.trim();
});

const chunkedParsedInput = computed(() => chunkText(
  parsedInput.value,
  inputState.maxChunkSize,
  inputState.chunkingBehavior,
  inputState.balkingDistance,
));

const previousChunkDisabled = computed(() => outputState.selectedChunkIndex === 0);
function selectPreviousChunk() {
  if (previousChunkDisabled.value) {
    return;
  }

  outputState.selectedChunkIndex--;
}

function selectNextChunk() {
  if (nextChunkDisabled.value) {
    return;
  }

  outputState.selectedChunkIndex++;
}

function copyChunkToClipboard() {
  outputTextarea.value?.copyToClipboard();
}

const nextChunkDisabled = computed(() => outputState.selectedChunkIndex >= chunkedParsedInput.value.length - 1);

function maybeSelectNextChunk() {
  if (outputState.autoSelectNextChunkOnCopy) {
    selectNextChunk();
  }
}
</script>

<template>
  <div class="input">
    <TextareaInput
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
  <div class="output">
    <TextareaInput
      id="output"
      ref="outputTextarea"
      :label="outputLabel"
      :model-value="selectedChunk"
      readonly
      @copy="maybeSelectNextChunk"
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
    <CheckboxInput
      id="go-to-next-chunk-on-copy"
      v-model="outputState.autoSelectNextChunkOnCopy"
      label="Go To Next Chunk Automatically"
    />
  </div>
</template>
