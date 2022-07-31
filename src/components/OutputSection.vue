<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useInputParameters } from '../store/useInputParameters';
import CheckboxInput from './CheckboxInput.vue';
import TextareaInput from './TextareaInput.vue';
import { removeParentheticals } from '../utilities/removeParentheticals';
import { chunkText } from '../utilities/chunkText';
import { ChunkingBehavior } from '../types/ChunkingBehavior';
import { removeLineTerminators } from '../utilities/removeLineTerminators';
import { removeCitations } from '../utilities/removeCitations';
import { truncateConsecutiveSpaces } from '../utilities/truncateConsecutiveSpaces';
import { fixOrphanedPunctuation } from '../utilities/fixOrphanedPunctuation';

const store = useInputParameters();

const outputTextarea = ref<InstanceType<typeof TextareaInput> | null>(null);

const state = reactive({
  autoSelectNextChunkOnCopy: true,
  selectedChunkIndex: 0,
});

watch(
  () => store,
  () => {
    state.selectedChunkIndex = 0;
  },
  {
    deep: true,
  },
);

  const parsedInput = computed(() => {
    let parsed = store.input;

    if (store.removeParentheticals) {
      parsed = removeParentheticals(parsed);
    }
  
    if (store.removeCitations) {
      parsed = removeCitations(parsed);
    }
  
    if (store.removeLineTerminators) {
      parsed = removeLineTerminators(parsed);
    }
  
    parsed = truncateConsecutiveSpaces(parsed);
  
    parsed = fixOrphanedPunctuation(parsed);
  
    return parsed.trim();
  });

  const chunkedParsedInput = computed(() => {
    if (store.chunkingBehavior === ChunkingBehavior.none) {
      return [parsedInput.value];
    }

    return chunkText(
      parsedInput.value,
      store.maxChunkSize,
      store.chunkingBehavior,
      store.balkingDistance,
    );
  });

const outputLabel = computed(() => `Output (${state.selectedChunkIndex + 1}/${chunkedParsedInput.value.length})`);

const selectedChunk = computed(() => chunkedParsedInput.value[state.selectedChunkIndex]);
const previousChunkDisabled = computed(() => state.selectedChunkIndex === 0);
const nextChunkDisabled = computed(() => state.selectedChunkIndex >= chunkedParsedInput.value.length - 1);

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
  outputTextarea.value?.copyToClipboard();
}

function maybeSelectNextChunk() {
  if (state.autoSelectNextChunkOnCopy) {
    selectNextChunk();
  }
}
</script>

<template>
  <div>
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
      v-model="state.autoSelectNextChunkOnCopy"
      label="Go To Next Chunk Automatically"
    />
  </div>
</template>