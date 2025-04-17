<script setup>
import { reactive, onMounted, computed } from 'vue'
import { ref, runTransaction, set, onValue, push, update, remove } from 'firebase/database'

import { db } from '@/main'

import { useAuth } from '@/composables/useAuth'

import SelectDateButtons from '@/components/SelectDateButtons.vue'
import AddTodo from '@/components/AddTodo.vue'
import TodoList from '@/components/TodoList.vue'

import { getDates } from '@/utils/getDates'

const dates = getDates()
const todoState = reactive({
  newTodo: '',
  selectedDate: dates[0],
  todos: [],
})

const { user } = useAuth()

const selectNewDate = (date) => (todoState.selectedDate = date)

const addTodo = async () => {
  if (!user.value || !todoState.newTodo.length) return

  try {
    const newTodoRef = push(ref(db, `users/${user.value}/${todoState.selectedDate}`))
    const todo = {
      id: newTodoRef.key,
      title: todoState.newTodo,
      done: false,
    }

    await set(newTodoRef, todo)
  } catch (error) {
    console.error(error)
  }

  todoState.newTodo = ''
}

const updateTodo = async (id, updatedParams) => {
  if (!user.value) return

  try {
    const todoRef = ref(db, `users/${user.value}/${todoState.selectedDate}/${id}`)
    await update(todoRef, updatedParams)
  } catch (error) {
    console.error(error)
  }
}

const removeTodo = async (id) => {
  if (!user.value) return

  try {
    const todoRef = ref(db, `users/${user.value}/${todoState.selectedDate}/${id}`)
    await remove(todoRef)
  } catch (error) {
    console.error(error)
  }
}

const todosForSelectedDay = computed(() => {
  const dayTodos = todoState.todos[todoState.selectedDate]
  return dayTodos ? Object.values(dayTodos) : []
})

onMounted(() => {
  if (!user.value) return

  const userRef = ref(db, `users/${user.value}`)

  onValue(userRef, async (snapshot) => {
    const todos = snapshot.val() || {}

    const pastDates = Object.keys(todos).filter((date) => date < dates[0])

    if (pastDates.length) {
      const cleanedTodos = Object.fromEntries(
        Object.entries(todos).filter(([date]) => !pastDates.includes(date)),
      )

      await set(userRef, cleanedTodos)
    }

    todoState.todos = todos
  })
})
</script>

<template>
  <main>
    <h2>Start your beautiful day with a to-do list!</h2>
    <SelectDateButtons
      :dates="dates"
      :selectedDate="todoState.selectedDate"
      @select-new-date="selectNewDate"
    />
    <AddTodo v-model="todoState.newTodo" @add-todo="addTodo" />
    <TodoList
      :todosForSelectedDay="todosForSelectedDay"
      @update-todo="updateTodo"
      @remove-todo="removeTodo"
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
