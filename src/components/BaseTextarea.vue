<template>
  <label
    class="base-textarea__label"
    :for="id"
  >
    {{ label }}
  </label>
  <textarea
    :id="id"
    ref="textarea"
    cols="50"
    :readonly="readonly"
    rows="25"
    :spellcheck="false"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const textarea = ref<HTMLTextAreaElement | null>(null);

const props = defineProps<{
  copyToClipboard?: boolean,
  id: string,
  label: string,
  modelValue: string,
  readonly?: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:copyToClipboard', value: boolean,): void,
  (e: 'update:modelValue', value: string): void,
}>();

watch(
  () => props.copyToClipboard,
  (value) => {
    if (value) {
      copyToClipboard();
      emit('update:copyToClipboard', false);
    }
  },  
);

function copyToClipboard() {
  textarea.value.select();
  textarea.value.setSelectionRange(0, 500);

  navigator.clipboard.writeText(textarea.value.value);
}

function onInput(input: Event) {
  emit('update:modelValue', (input.target as HTMLInputElement).value);
}
</script>

<style>
textarea {
  display: block;
  margin-bottom: 5px;
  resize: none;
}

.base-textarea__label {
  display: block;
}
</style>