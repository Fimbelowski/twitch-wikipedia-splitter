<script setup lang="ts">
const props = defineProps<{
  id: string,
  label: string,
  modelValue: boolean,
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

// Because the checked attribute is only used for the checkbox's initial state, losing reactivity
// is intentional here.
// eslint-disable-next-line vue/no-setup-props-destructure
const checked = props.modelValue;

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>

<template>
  <div>
    <input
      :id="id"
      type="checkbox"
      :checked="checked"
      @change="onChange"
    >
    <label
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>
