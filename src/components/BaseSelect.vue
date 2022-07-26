<template>
  <div>
    <label
      class="base-select__label"
      :for="id"
    >
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      @input="onInput"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  label: string,
  options: string[],
  modelValue: string,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
}>();

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
}
</script>

<style>
.base-select__label {
  margin-right: 5px;
}
</style>