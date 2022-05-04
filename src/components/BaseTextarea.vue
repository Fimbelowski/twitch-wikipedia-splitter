<template>
  <label
    class="base-textarea__label"
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
    :value="modelValue"
    @input="onInput"
  />
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  label: string,
  modelValue: string,
  readonly?: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
}>();

function onInput(input: Event) {
  emit('update:modelValue', (input.target as HTMLInputElement).value);
}
</script>

<style>
.base-textarea__label {
  display: block;
}
</style>