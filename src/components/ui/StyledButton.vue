<script setup>
defineProps({
  disabled: Boolean,
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
}
</script>

<template>
  <button
    type="submit"
    @click="handleClick"
    :disabled="disabled"
    class="styled-button"
    :class="{ disabled: disabled && 'disabled' }"
  >
    <slot>submit</slot>
  </button>
</template>

<style scoped>
.styled-button {
  text-decoration: none;
  background: transparent;
  border: 2px solid var(--color-background-soft);
  color: var(--color-text);
  font-size: 20px;
  vertical-align: middle;
  height: 50px;
  padding: 0 10px;

  &:hover {
    cursor: pointer;
    background-color: var(--color-background-soft);
  }
  &.disabled {
    background: transparent;
    cursor: not-allowed;
  }
}
</style>
