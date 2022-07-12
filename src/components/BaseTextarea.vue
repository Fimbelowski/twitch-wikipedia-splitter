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
import { ref } from 'vue';

const textarea = ref<HTMLTextAreaElement | null>(null);

defineProps<{
  id: string,
  label: string,
  modelValue: string,
  readonly?: boolean,
}>();

const emit = defineEmits<{
  (e: 'copy'): void,
  (e: 'update:modelValue', value: string): void,
}>();

function copyToClipboard() {
  if (textarea.value === null) {
    return;
  }

  textarea.value.select();
  textarea.value.setSelectionRange(0, 500);
  navigator.clipboard.writeText(textarea.value.value);
  textarea.value.setSelectionRange(0,0);

  emit('copy');
}

function onInput(input: Event) {
  emit('update:modelValue', (input.target as HTMLInputElement).value);
}

defineExpose({
  copyToClipboard,
});
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