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
import BaseSelect from './components/BaseSelect.vue';
import BaseTextarea from './components/BaseTextarea.vue';
import CheckboxInput from './components/CheckboxInput.vue';
import NumberInput from './components/NumberInput.vue';

const inputState = reactive({
  chunkingBehavior: 'sentenceBoundary',
  chunkingBehaviorBalkingDistance: 100,
  input: '',
  maxChunkSize: 500,
  removeCitations: true,
  removeLineTerminators: true,
  removeParentheticals: true,
});

const chunkingBehaviorOptions: {
  label: string,
  value: string,
}[] = [
  {
    label: 'Chunk Size',
    value: 'chunkSize',
  },
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'Sentence Boundary',
    value: 'sentenceBoundary',
  },
  {
    label: 'Word Boundary',
    value: 'wordBoundary',
  },
];

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
  inputState.chunkingBehaviorBalkingDistance,
));

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
const outputTextarea = ref<InstanceType<typeof BaseTextarea> | null>(null);
const selectedChunk = computed(() => chunkedParsedInput.value[outputState.selectedChunkIndex]);

const previousChunkDisabled = computed(() => outputState.selectedChunkIndex === 0);
function selectPreviousChunk() {
  if (previousChunkDisabled.value) {
    return;
  }

  outputState.selectedChunkIndex--;
}

const nextChunkDisabled = computed(() => outputState.selectedChunkIndex >= chunkedParsedInput.value.length - 1);
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
  outputTextarea.value?.copyToClipboard();
}

function removeCitations(input: string) {
  return input.replace(/\[[^\]]*\]/gm, '');
}

function removeParentheticals(input: string) {
  let strippedInput = input;

  for (let i = strippedInput.length - 1; i > -1; i--) {
    const currentCharacter = strippedInput.charAt(i);
    let end = -1;

    if (currentCharacter === '(') {
      end = strippedInput.indexOf(')', i);

      if (end !== -1) {
        strippedInput = `${strippedInput.substring(0, i)}${strippedInput.substring(end + 1)}`
        i = strippedInput.length;
      }
    }
  }

  return strippedInput;
}

function chunkText(
  input: string,
  maxChunkSize: number,
  chunkingBehavior: string,
  balkingDistance: number
) {
  const hardSentenceBoundaryRegExp = /[.?!] /gm;
  const softSentenceBoundaryRegExp = /[,;-] /gm;

  if (
    chunkingBehavior === 'none'
    || input === ''
    ) {
    return [input];
  }

  let remainingInput = input.trim();
  const chunks: string[] = [];

  while (remainingInput.length > 0) {
    if (remainingInput.length <= maxChunkSize) {
      chunks.push(remainingInput);
      break;
    }

    const rawChunk = remainingInput.substring(0, maxChunkSize);
    let tentativeEndIndex = rawChunk.length - 1;
    let distance = Infinity;

    if (chunkingBehavior === 'sentenceBoundary') {
      let matches = Array.from(rawChunk.matchAll(hardSentenceBoundaryRegExp));
      let nextMatch = matches.pop();

      if (nextMatch !== undefined) {
        tentativeEndIndex = nextMatch.index || Infinity;
        distance = 500 - tentativeEndIndex + 1;
      }

      if (distance > balkingDistance) {
        matches = Array.from(rawChunk.matchAll(softSentenceBoundaryRegExp));
        nextMatch = matches.pop();

        if (nextMatch !== undefined) {
          tentativeEndIndex = nextMatch.index || Infinity;
          distance = 500 - tentativeEndIndex + 1;
        }
      }
    }

    if (
      chunkingBehavior === 'wordBoundary'
      || distance > balkingDistance
    ) {
      if (rawChunk.includes(' ')) {
        tentativeEndIndex = rawChunk.lastIndexOf(' ');
      }
    }

    chunks.push(rawChunk.substring(0, tentativeEndIndex + 1));
    remainingInput = remainingInput
      .substring(tentativeEndIndex + 1)
      .trim();
  }

  return chunks;
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
