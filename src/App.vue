<script setup lang="ts">
import InputSection from '@/components/InputSection.vue';
import OutputSection from '@/components/OutputSection.vue';
</script>

<template>
  <InputSection />
  <OutputSection />
</template>

<style>
#app {
  display: flex;
  gap: 10px;
  justify-content: center;
}

@media (max-width: 768px) {
  #app {
    flex-direction: column;
  }
}

.section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
