<script setup>
import TodoItem from './TodoItem.vue'

const { todosForSelectedDay } = defineProps({
  todosForSelectedDay: {
    type: Object,
    default: () => [],
  },
})

const emit = defineEmits(['update-todo', 'remove-todo'])

const emitUpdate = (id, updatedParams) => {
  emit('update-todo', id, updatedParams)
}

const emitRemove = (id) => {
  emit('remove-todo', id)
}
</script>

<template>
  <section v-if="todosForSelectedDay.length">
    <h3>Todo List:</h3>
    <TodoItem
      v-for="todo in todosForSelectedDay"
      :key="todo.id"
      :todo="todo"
      @update-todo="emitUpdate"
      @remove-todo="emitRemove"
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
