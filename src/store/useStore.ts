import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { default as ChunkingBehaviors } from '../types/ChunkingBehaviors';

export const useStore = defineStore('main', () => {
  const input = ref('');

  const removeCitations = ref(true);
  const removeLineTerminators = ref(true);
  const removeParentheticals = ref(true);

  const maxChunkSize = ref(500);
  const chunkingBehavior = ref(ChunkingBehaviors.sentenceBoundary);
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