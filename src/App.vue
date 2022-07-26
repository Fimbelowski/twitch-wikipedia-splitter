<script setup lang="ts">
import { reactive } from 'vue';
import BaseTextarea from './components/BaseTextarea.vue';

const inputState = reactive({
  input: '',
});
</script>

<template>
  <BaseTextarea
    id="input"
    label="Input"
    v-model="inputState.input"
  />
</template>
