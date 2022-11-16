<script setup lang="ts">
import InputSection from './InputSection.vue';
import OutputSection from './OutputSection.vue';
</script>

<template>
  <div class="main-content">
    <InputSection />
    <span class="main-content__arrow" />
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
    [input-start] 1fr [input-end arrow-start]  3.5rem [arrow-end output-start] 1fr [output-end];

  column-gap: 1rem;

  @include respond(medium) {
    padding: 1rem;
  }

  @include respond(small) {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  &__arrow {
    align-self: center;
    justify-self: center;

    font-size: 3rem;

    &::after {
      content: "\2192";

      @include respond(small) {
        content: "\2193";
      }
    }
  }
}
</style>
