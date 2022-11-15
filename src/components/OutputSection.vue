<script setup lang="ts">
import {
  computed,
  reactive,
  ref,
  watch,
} from 'vue';

import CheckboxInput from './CheckboxInput.vue';
import ChunkingBehavior from '@/types/ChunkingBehavior';
import chunkText from '@/utilities/chunkText';
import fixOrphanedPunctuation from '@/utilities/fixOrphanedPunctuation';
import removeCitations from '@/utilities/removeCitations';
import removeLineTerminators from '@/utilities/removeLineTerminators';
import removeParentheticals from '@/utilities/removeParentheticals';
import TextareaInput from './TextareaInput.vue';
import truncateConsecutiveSpaces from '@/utilities/truncateConsecutiveSpaces';
import useInputParameters from '@/store/useInputParameters';

const inputParameters = useInputParameters();

const outputTextarea = ref<InstanceType<typeof TextareaInput> | null>(null);

const state = reactive({
  autoSelectNextChunkOnCopy: true,
  selectedChunkIndex: 0,
});

watch(
  () => inputParameters,
  () => {
    state.selectedChunkIndex = 0;
  },
  {
    deep: true,
  },
);

const parsedInput = computed(() => {
  let parsed = inputParameters.input;

  if (inputParameters.removeParentheticals) {
    parsed = removeParentheticals(parsed);
  }

  if (inputParameters.removeCitations) {
    parsed = removeCitations(parsed);
  }

  if (inputParameters.removeLineTerminators) {
    parsed = removeLineTerminators(parsed);
  }

  parsed = truncateConsecutiveSpaces(parsed);

  parsed = fixOrphanedPunctuation(parsed);

  return parsed.trim();
});

const chunkedParsedInput = computed(() => {
  if (inputParameters.chunkingBehavior === ChunkingBehavior.none) {
    return [parsedInput.value];
  }

  return chunkText(
    parsedInput.value,
    inputParameters.maxChunkSize,
    inputParameters.chunkingBehavior,
    inputParameters.balkingDistance,
  );
});

const outputLabel = computed(() => `Output (${state.selectedChunkIndex + 1}/${chunkedParsedInput.value.length})`);

const selectedChunk = computed(() => chunkedParsedInput.value[state.selectedChunkIndex]);
const previousChunkDisabled = computed(() => state.selectedChunkIndex === 0);
const nextChunkDisabled = computed(
  () => state.selectedChunkIndex >= chunkedParsedInput.value.length - 1,
);

function selectPreviousChunk() {
  state.selectedChunkIndex -= 1;
}

function selectNextChunk() {
  state.selectedChunkIndex += 1;
}

function copyChunkToClipboard() {
  outputTextarea.value?.copyToClipboard();

  if (state.autoSelectNextChunkOnCopy && !nextChunkDisabled.value) {
    selectNextChunk();
  }
}
</script>

<template>
  <TextareaInput
    id="output"
    ref="outputTextarea"
    :label="outputLabel"
    :model-value="selectedChunk"
    readonly
  />
  <div
    class="output-section__controls"
  >
    <div class="output-section__navigation">
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
      v-model="state.autoSelectNextChunkOnCopy"
      label="Go To Next Chunk Automatically"
    />
  </div>
</template>

<style lang="scss">
.output-section {
  &__controls {
    grid-column: output-start / output-end;

    :not(:last-child) {
      margin-bottom: 2px;
    }
  }

  &__navigation {
    display: flex;
    justify-content: center;
    gap: 4px;
  }
}
</style>
