<script setup>
import TodoItem from './TodoItem.vue'

const { todosForSelectedDay } = defineProps({
  todosForSelectedDay: {
    type: Object,
    default: () => [],
  },
})

const emit = defineEmits(['remove-todo', 'toggle-todo'])

const emitRemove = (id) => {
  emit('remove-todo', id)
}

const emitToggle = (id) => {
  emit('toggle-todo', id)
}
</script>

<template>
  <section>
    <h3>Todo List:</h3>
    <TodoItem
      v-for="todo in todosForSelectedDay"
      :key="todo.id"
      :todo="todo"
      @remove-todo="emitRemove"
      @toggle-todo="emitToggle"
    />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
