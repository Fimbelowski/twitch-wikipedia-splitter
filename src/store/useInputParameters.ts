import { defineStore } from 'pinia';
import { ref } from 'vue';

import ChunkingBehavior from '@/types/ChunkingBehavior';

const useInputParameters = defineStore('inputParameters', () => {
  const input = ref('');

  const removeCitations = ref(true);
  const removeLineTerminators = ref(true);
  const removeParentheticals = ref(true);

  const maxChunkSize = ref(500);
  const chunkingBehavior = ref(ChunkingBehavior.sentenceBoundary);
  const balkingDistance = ref(100);

  function updateInput(newValue: string) {
    input.value = newValue;
  }

  function updateRemoveCitations(newValue: boolean) {
    removeCitations.value = newValue;
  }

  function updateRemoveLineTerminators(newValue: boolean) {
    removeLineTerminators.value = newValue;
  }

  function updateRemoveParentheticals(newValue: boolean) {
    removeParentheticals.value = newValue;
  }

  function updateMaxChunkSize(newValue: number) {
    maxChunkSize.value = newValue;
  }

  function updateChunkingBehavior(newValue: string) {
    chunkingBehavior.value = newValue as ChunkingBehavior;
  }

  function updateBalkingDistance(newValue: number) {
    balkingDistance.value = newValue;
  }

  return {
    balkingDistance,
    chunkingBehavior,
    input,
    maxChunkSize,
    removeCitations,
    removeLineTerminators,
    removeParentheticals,
    updateBalkingDistance,
    updateChunkingBehavior,
    updateInput,
    updateMaxChunkSize,
    updateRemoveCitations,
    updateRemoveLineTerminators,
    updateRemoveParentheticals,
  };
});

export default useInputParameters;
