<template>
  <div>
    <label
      v-if="displayLeftSideLabel"
      class="base-input__label--left"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :checked="isChecked"
      :max="max"
      :min="min"
      :type="type"
      :value="modelValue"
      @change="onChange"
      @input="onInput"
    >
    <label
      v-if="displayRightSideLabel"
      class="base-input__label--right"
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  id: string,
  label: string,
  max?: number,
  min?: number,
  modelValue: boolean | string,
  type: string,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | string): void,
}>();

const isCheckbox = computed(() => props.type === 'checkbox');
const isChecked = computed(() => isCheckbox.value && props.modelValue === true);

const displayLeftSideLabel = computed(() => !isCheckbox.value);
const displayRightSideLabel = computed(() => isCheckbox.value);

function onChange(event: Event) {
  if (props.type !== 'checkbox') {
    return;
  }

  emit('update:modelValue', (event.target as HTMLInputElement).checked);
}

function onInput(event: Event) {
  if (props.type === 'checkbox') {
    return;
  }

  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<style>
[class^=base-input__label] {
  cursor: pointer;
}

.base-input__label--left {
  padding-right: 5px;
}

.base-input__label--right {
  padding-left: 5px;
}
</style>