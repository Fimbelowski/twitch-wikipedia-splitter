<script setup lang="ts">
import InputSection from './InputSection.vue';
import OutputSection from './OutputSection.vue';
</script>

<template>
  <div class="main-content">
    <InputSection />
    <span class="main-content__arrow">&xrarr;</span>
    <OutputSection />
  </div>
</template>

<style lang="scss">
.main-content {
  padding: 5rem;
  margin: 0 auto;
  max-width: 120rem;

  display: grid;
  grid-template-columns:
    [input-start] 1fr [input-end arrow-start]  2.5rem [arrow-end output-start] 1fr [output-end];

  gap: 1rem;

  &__arrow {
    align-self: center;
  }
}
</style>
