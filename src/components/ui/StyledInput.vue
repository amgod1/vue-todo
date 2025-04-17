<script setup>
import { ref } from 'vue'

const input = ref(null)
const props = defineProps({
  modelValue: String,
  disabled: Boolean,
})

defineEmits(['update:modelValue'])

defineExpose({
  focus: () => input.value?.focus(),
})
</script>

<template>
  <input
    ref="input"
    :disabled="disabled"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="styled-input"
  />
</template>

<style scoped>
.styled-input {
  height: 40px;
  padding: 10px;
  font-size: 15px;

  &:focus {
    outline: none;
  }
}
</style>
