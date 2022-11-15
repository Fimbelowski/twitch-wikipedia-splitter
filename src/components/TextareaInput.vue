<script setup lang="ts">
import { ref } from 'vue';

const textarea = ref<HTMLTextAreaElement | null>(null);

defineProps<{
  id: string,
  label: string,
  modelValue: string,
  readonly?: boolean,
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

function copyToClipboard() {
  textarea.value?.select();
  document.execCommand('copy');
}

function onInput(input: Event) {
  emit('update:modelValue', (input.target as HTMLInputElement).value);
}

defineExpose({
  copyToClipboard,
});
</script>

<template>
  <div class="textarea-input">
    <label
      class="textarea-input__label"
      :for="id"
    >
      {{ label }}
    </label>
    <textarea
      :id="id"
      ref="textarea"
      class="textarea-input__textarea"
      :readonly="readonly"
      :spellcheck="false"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss">
.textarea-input {
  &__label {
    display: block;
    text-align: center;
  }

  &__textarea {
    width: 100%;
    height: 40rem;
    margin-bottom: .5rem;

    resize: none;
  }
}
</style>
