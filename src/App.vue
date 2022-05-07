<template>
  <div
    class="input"
  >
    <BaseTextarea
      id="input"
      v-model="inputState.input"
      label="Input"
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
    <BaseSelect
      id="chunking-behavior"
      v-model="inputState.chunkingBehavior"
      label="Chunking Behavior"
      :options="chunkingBehaviorOptions"
    />
    <NumberInput
      id="balking-distance"
      v-model="inputState.chunkingBehaviorBalkingDistance"
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
    <CheckboxInput
      id="go-to-next-chunk-on-copy"
      v-model="outputState.autoSelectNextChunkOnCopy"
      label="Go To Next Chunk Automatically"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import CheckboxInput from '@/components/CheckboxInput.vue';
import { ChunkingBehaviors } from './types/ChunkingBehaviors';
import NumberInput from '@/components/NumberInput.vue';
import SelectOption from '../src/types/SelectOption';
import chunkText from '../src/helpers/chunkText';
import fixOrphanedPunctuation from '../src/helpers/fixOrphanedPunctutation';
import removeCitations from '../src/helpers/removeCitations';
import removeParentheticals from '../src/helpers/removeParentheticals';
import trimConsecutiveSpaces from '../src/helpers/trimConsecutiveSpaces';

const outputTextarea = ref<InstanceType<typeof BaseTextarea> | null>(null);

const inputState = reactive({
  chunkingBehavior: ChunkingBehaviors.sentenceBoundary,
  chunkingBehaviorBalkingDistance: 100,
  input: '',
  removeCitations: true,
  removeLineTerminators: true,
  removeParentheticals: true,
});

const outputState = reactive({
  autoSelectNextChunkOnCopy: true,
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
  () => inputState,
  () => {
    outputState.selectedChunkIndex = 0;
  },
  {
    deep: true,
  },
);

const parsedInput = computed(() => {
  let parsed = inputState.input;

  if (inputState.removeParentheticals) {
    parsed = removeParentheticals(parsed);
  }

  if (inputState.removeCitations) {
    parsed = removeCitations(parsed);
  }

  // Remove line terminators
  parsed = parsed.replace(/[\n\r]/gm, ' ');

  parsed = fixOrphanedPunctuation(parsed);
  parsed = trimConsecutiveSpaces(parsed);
  return parsed.trim();
});

const chunkedParsedInput = computed(() => chunkText(parsedInput.value, inputState.chunkingBehavior, inputState.chunkingBehaviorBalkingDistance));

const selectedChunk = computed(() => chunkedParsedInput.value[outputState.selectedChunkIndex]);
const previousChunkDisabled = computed(() => outputState.selectedChunkIndex === 0);
const nextChunkDisabled = computed(() => outputState.selectedChunkIndex >= chunkedParsedInput.value.length - 1);

const outputLabel = computed(() => `Output (${outputState.selectedChunkIndex + 1}/${chunkedParsedInput.value.length})`);

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

function maybeSelectNextChunk() {
  if (outputState.autoSelectNextChunkOnCopy) {
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

.input {
  margin-right: 25px;
}

.output__controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  justify-content: center;
  padding-top: 25px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
