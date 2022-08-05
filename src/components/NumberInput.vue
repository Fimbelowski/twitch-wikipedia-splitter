<template>
  <label
    :for="id"
  >
    {{ label }}
  </label>
  <input
    :id="id"
    :max="max"
    :min="min"
    type="number"
    :value="modelValue"
    @input="onInput"
  >
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  label: string,
  max?: number,
  min?: number,
  modelValue: number,
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', parseInt(target.value, 10));
}
</script>
