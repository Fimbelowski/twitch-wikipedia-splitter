<template>
  <div>
    <label
      class="base-input__label"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :max="max"
      :min="min"
      :type="type"
      :value="modelValue"
      @input="onInput"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  label: string,
  max: number,
  min: number,
  modelValue: string,
  type: string,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
}>();

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<style>
.base-input__label {
  margin-right: 5px;
}
</style>