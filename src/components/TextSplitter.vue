<template>
  <BaseTextarea
    id="input"
    v-model="state.input"
    label="Input"
  />
</template>

<script setup lang="ts">
import BaseTextarea from '@/components/BaseTextarea.vue';
import { reactive } from 'vue';

const state = reactive({
  input: '',
  removeCitations: true,
  removeParentheticals: true,
});
</script>