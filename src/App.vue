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
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
