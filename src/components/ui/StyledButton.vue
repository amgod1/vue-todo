<script setup>
defineProps({
  disabled: Boolean,
  undo: Boolean,
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
    :class="{ disabled: disabled, undo: undo }"
  >
    <slot>submit</slot>
  </button>
</template>

<style scoped>
.styled-button {
  text-decoration: none;
  background: var(--color-button-bg);
  border: 2px solid var(--color-button-border);
  color: var(--color-text);
  font-size: 20px;
  vertical-align: middle;
  padding: 10px;

  &:hover {
    cursor: pointer;
    color: var(--color-button-hover-text);
    background-color: var(--color-button-hover-bg);
  }
}

.styled-button.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.styled-button.undo {
  background-color: var(--toast-undo-btn-bg);
  color: var(--toast-undo-btn-text);
  border: var(--toast-undo-btn-border);
}

.styled-button.undo:hover {
  background-color: var(--toast-undo-btn-hover-bg);
  color: var(--toast-undo-btn-hover-text);
}
</style>
