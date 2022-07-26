<template>
  <BaseInput
    :id="id"
    :label="label"
    :max="max"
    :min="min"
    :model-value="modelValueAsString"
    type="number"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import BaseInput from './BaseInput.vue';
import { computed } from 'vue';

const props = defineProps<{
  id: string,
  label: string,
  max?: number,
  min?: number,
  modelValue: number,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void,
}>();

const modelValueAsString = computed(() => props.modelValue.toString());

function onUpdateModelValue(value: string | boolean) {
  if (typeof value === 'boolean') {
    return;
  }

  emit('update:modelValue', parseInt(value, 10));
}
</script>