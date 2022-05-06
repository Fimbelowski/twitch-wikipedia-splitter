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
    <BaseSelect
      id="chunking-behavior"
      v-model="state.chunkingBehavior"
      label="Chunking Behavior"
      :options="chunkingBehaviorOptions"
    />
    <NumberInput
      id="balking-distance"
      v-model="state.chunkingBehaviorBalkingDistance"
      label="Balking Distance"
      :max="499"
      :min="1"
    />
  </div>
  <div>
    <BaseTextarea
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
    <BaseCheckbox
      id="go-to-next-chunk-on-copy"
      v-model="state.autoSelectNextChunkOnCopy"
      label="Go To Next Chunk Automatically"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import { ChunkingBehaviors } from './types/ChunkingBehaviors';
import NumberInput from '@/components/NumberInput.vue';
import SelectOption from '../src/types/SelectOption';
import chunkText from '../src/helpers/chunkText';
import removeParentheticals from '../src/helpers/removeParentheticals';

const outputTextarea = ref<InstanceType<typeof BaseTextarea> | null>(null);

const state = reactive({
  autoSelectNextChunkOnCopy: true,
  chunkingBehavior: ChunkingBehaviors.wordBoundary,
  chunkingBehaviorBalkingDistance: 100,
  input: '',
  removeCitations: true,
  removeParentheticals: true,
  selectedChunkIndex: 0,
});

const chunkingBehaviorOptions: SelectOption[] = [
  {
    label: 'Chunk Size',
    value: ChunkingBehaviors.chunkSize,
  },
  {
    label: 'None',
    value: ChunkingBehaviors.none,
  },
  {
    label: 'Sentence Boundary',
    value: ChunkingBehaviors.sentenceBoundary,
  },
  {
    label: 'Word Boundary',
    value: ChunkingBehaviors.wordBoundary,
  },
];

watch(
  ([
    () => state.input,
    () => state.removeCitations,
    () => state.removeParentheticals,
  ]),
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

const chunkedParsedInput = computed(() => chunkText(parsedInput.value, state.chunkingBehavior, state.chunkingBehaviorBalkingDistance));

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

function maybeSelectNextChunk() {
  if (state.autoSelectNextChunkOnCopy) {
    selectNextChunk();
  }
}

function copyChunkToClipboard() {
  outputTextarea.value.copyToClipboard();
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
  margin-bottom: 5px;
}
</style>
