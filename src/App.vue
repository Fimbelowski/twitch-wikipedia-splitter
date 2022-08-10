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

.section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
