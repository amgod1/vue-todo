<script setup>
import StyledButton from './ui/StyledButton.vue'

const { todo } = defineProps({
  todo: Object,
})

const emit = defineEmits(['remove-todo', 'toggle-todo'])

const emitRemove = () => {
  emit('remove-todo', todo.id)
}

const emitToggle = () => {
  emit('toggle-todo', todo.id)
}
</script>

<template>
  <div>
    <div>
      <input type="checkbox" :checked="todo.done" @change="emitToggle" />
      <h4>{{ todo.title }}</h4>
    </div>
    <StyledButton @click="emitRemove">delete</StyledButton>
  </div>
</template>

<style scoped>
div {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

input[type='checkbox'] {
  cursor: pointer;
  width: 20px;
  height: 20px;
}

h4 {
  font-size: 20px;
}
</style>
