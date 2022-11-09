<script setup lang="ts">
import InputSection from '@/components/InputSection.vue';
import OutputSection from '@/components/OutputSection.vue';
</script>

<template>
  <InputSection />
  <OutputSection />
</template>

<style lang="scss">
@import './sass/base/reset';
@import './sass/base/typography';

#app {
  display: flex;
  gap: 1rem;
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
