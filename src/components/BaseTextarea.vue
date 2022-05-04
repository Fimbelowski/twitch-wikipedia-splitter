<template>
  <label
    :for="id"
  >
    {{ label }}
  </label>
  <textarea
    :id="id"
    cols="50"
    :readonly="readonly"
    rows="25"
    :spellcheck="false"
    @input="onInput"
  />
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
}>();

defineProps<{
  id: string,
  label: string,
  modelValue: string,
  readonly?: boolean,
}>();

function onInput(input: Event) {
  emit('update:modelValue', (input.target as HTMLInputElement).value);
}
</script>

<style>
label {
  display: block;
}
</style>