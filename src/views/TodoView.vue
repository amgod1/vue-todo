<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'

import { useTodo } from '@/composables/useTodo'

import SelectDateButtons from '@/components/SelectDateButtons.vue'
import AddTodo from '@/components/AddTodo.vue'
import TodoList from '@/components/TodoList.vue'

import { getCurrentDate } from '@/utils/getDates'

const newTodo = ref('')
const selectedDate = ref(getCurrentDate())

const { fetchTodos, getTodosForSelectedDay, createTodo, updateTodo, deleteTodo } = useTodo()

const selectNewDate = (date) => (selectedDate.value = date)

const createTodoHandler = async () => {
  await createTodo(selectedDate.value, newTodo.value)
  newTodo.value = ''
}

const updateTodoHandler = async (id, updateDto) => {
  await updateTodo(selectedDate.value, id, updateDto)
}

const deleteTodoHandler = async (id) => {
  await deleteTodo(selectedDate.value, id)
}

const todosForSelectedDay = computed(() => getTodosForSelectedDay(selectedDate.value))

onMounted(async () => {
  await fetchTodos()
})
</script>

<template>
  <main>
    <h2>Start your beautiful day with a to-do list!</h2>
    <SelectDateButtons :selectedDate="selectedDate" @select-new-date="selectNewDate" />
    <AddTodo v-model="newTodo" @create-todo="createTodoHandler" />
    <TodoList
      :todosForSelectedDay="todosForSelectedDay"
      @update-todo="updateTodoHandler"
      @remove-todo="deleteTodoHandler"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

main h2 {
  text-align: center;
}

input {
  padding: 5px;
}

section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
