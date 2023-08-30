<script setup lang="ts">
import { computed, reactive, watch } from 'vue';

import chunkText from '@/utilities/chunkText';
import fixOrphanedPunctuation from '@/utilities/fixOrphanedPunctuation';
import removeCitations from '@/utilities/removeCitations';
import removeLineTerminators from '@/utilities/removeLineTerminators';
import removeParentheticals from '@/utilities/removeParentheticals';
import truncateConsecutiveSpaces from '@/utilities/truncateConsecutiveSpaces';
import useInputParameters from '@/store/useInputParameters';
import CheckboxInput from './CheckboxInput.vue';

const inputParameters = useInputParameters();

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
  }
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

const chunkedParsedInput = computed(() =>
  chunkText(
    parsedInput.value,
    inputParameters.maxChunkSize,
    inputParameters.chunkingBehavior,
    inputParameters.balkingDistance
  )
);

const outputLabel = computed(
  () =>
    `Output (${state.selectedChunkIndex + 1}/${
      chunkedParsedInput.value.length
    })`
);

const selectedChunk = computed(
  () => chunkedParsedInput.value[state.selectedChunkIndex]
);
const previousChunkDisabled = computed(() => state.selectedChunkIndex === 0);
const nextChunkDisabled = computed(
  () => state.selectedChunkIndex >= chunkedParsedInput.value.length - 1
);

function selectPreviousChunk() {
  state.selectedChunkIndex -= 1;
}

function selectNextChunk() {
  state.selectedChunkIndex += 1;
}

async function copyChunkToClipboard() {
  await navigator.clipboard.writeText(selectedChunk.value);

  if (state.autoSelectNextChunkOnCopy && !nextChunkDisabled.value) {
    selectNextChunk();
  }
}
</script>

<template>
  <div>
    <label class="output-section__output-label">{{ outputLabel }}</label>
    <output class="output-section__output">{{ selectedChunk }}</output>
  </div>
  <div class="output-section__controls">
    <div class="output-section__navigation">
      <button
        class="output-section__button"
        :disabled="previousChunkDisabled"
        type="button"
        @click="selectPreviousChunk"
      >
        &lt; Previous Chunk
      </button>
      <button
        class="output-section__button"
        type="button"
        @click="copyChunkToClipboard"
      >
        Copy Chunk
      </button>
      <button
        class="output-section__button"
        :disabled="nextChunkDisabled"
        type="button"
        @click="selectNextChunk"
      >
        Next Chunk &gt;
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
  &__button {
    display: block;
    width: 100%;
  }

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

  &__output {
    background-color: #eee;
    border: 1px solid black;
    border-radius: 0.2rem;
    display: block;
    height: 40rem;
    padding: 0.5rem;
  }

  &__output-label {
    display: block;
    text-align: center;
  }
}
</style>
