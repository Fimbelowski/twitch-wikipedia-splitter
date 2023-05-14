<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  max?: number;
  min?: number;
  modelValue: number;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', parseInt(target.value, 10));
}
</script>

<template>
  <div class="number-input">
    <label class="number-input__label" :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      class="number-input__input"
      :max="max"
      :min="min"
      type="number"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss">
.number-input {
  &__label {
    padding-right: 1rem;
  }
}
</style>
