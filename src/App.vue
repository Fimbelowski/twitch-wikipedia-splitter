<script setup lang="ts">
import InputSection from '@/components/InputSection.vue';
import OutputSection from '@/components/OutputSection.vue';
</script>

<template>
  <div class="flex">
    <InputSection />
    <OutputSection />
  </div>
</template>

<style>
.flex {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
