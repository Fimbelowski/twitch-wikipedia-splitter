<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  options: string[];
  modelValue: string;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
}
</script>

<template>
  <div class="select-input">
    <label class="select-input__label" :for="id">
      {{ label }}
    </label>
    <select
      :id="id"
      class="select-input__select"
      :value="modelValue"
      @input="onInput"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
.select-input {
  &__label {
    padding-right: 1rem;
  }
}
</style>
