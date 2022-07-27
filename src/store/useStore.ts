import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { default as ChunkingBehavior } from '../types/ChunkingBehavior';

export const useStore = defineStore('main', () => {
  const input = ref('');

  const removeCitations = ref(true);
  const removeLineTerminators = ref(true);
  const removeParentheticals = ref(true);

  const maxChunkSize = ref(500);
  const chunkingBehavior = ref(ChunkingBehavior.sentenceBoundary);
  const balkingDistance = ref(100);

  return {
    input,
    removeCitations,
    removeLineTerminators,
    removeParentheticals,
    maxChunkSize,
    chunkingBehavior,
    balkingDistance,
  };
});