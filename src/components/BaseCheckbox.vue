<template>
  <div>
    <input
      :id="id"
      :checked="modelValue"
      class="base-checkbox__input"
      type="checkbox"
      @change="onChange"
    >
    <label
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  label: string,
  modelValue: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
}>();

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked);
}
</script>

<style>
.base-checkbox__input {
  margin-right: 5px;
}
</style>