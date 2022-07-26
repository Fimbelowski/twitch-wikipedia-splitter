<template>
  <div>
    <input
      :id="id"
      type="checkbox"
      @change="onChange"
      :checked="checked"
    >
    <label
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string,
  label: string,
  modelValue: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
}>();

const checked = props.modelValue;

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>