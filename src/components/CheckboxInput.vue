<template>
  <BaseInput
    :id="id"
    :label="label"
    :model-value="modelValue"
    type="checkbox"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';

defineProps<{
  id: string,
  label: string,
  modelValue: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
}>();

function onUpdateModelValue(value: boolean) {
  emit('update:modelValue', value);
}
</script>