import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { todoService } from '@/services/todoService'
import { tryCatchHandler } from '@/utils/tryCatchHandler'
import { useToast } from '@/composables/useToast'
import { TOAST_TYPES } from '@/constants/toasts'

export const useTodoStore = defineStore('todo', () => {
  const { showToast, removeToast } = useToast()
  const todos = ref({})
  const softDeleteTimeouts = reactive({})
  const authStore = useAuthStore()

  const getTodosForSelectedDay = (selectedDate) => {
    const dayTodos = todos.value[selectedDate]
    return dayTodos
      ? Object.values(todos.value[selectedDate]).filter((todo) => !softDeleteTimeouts[todo.id])
      : []
  }

  const fetchTodos = async () => {
    await tryCatchHandler(() =>
      todoService.getList(authStore.user, (updatedTodos) => {
        todos.value = updatedTodos
      }),
    )
  }

  const createTodo = async (date, title) => {
    const { data, status } = await tryCatchHandler(() =>
      todoService.create(authStore.user, date, title),
    )

    showToast(TOAST_TYPES.TODO_ADD, status)

    return data
  }

  const updateTodo = async (date, id, updateDto) => {
    const { data, status } = await tryCatchHandler(() =>
      todoService.update(authStore.user, date, id, updateDto),
    )

    showToast(TOAST_TYPES.TODO_UPDATE, status)

    return data
  }

  const deleteTodo = (date, id) => {
    const timeoutId = setTimeout(async () => {
      await tryCatchHandler(() => todoService.delete(authStore.user, date, id))
    }, 3000)

    softDeleteTimeouts[id] = timeoutId

    showToast(TOAST_TYPES.TODO_DELETE, 'success', { todoId: id })
  }

  const undoDelete = (toastId, toastPayload) => {
    const { todoId } = toastPayload

    clearTimeout(softDeleteTimeouts[todoId])
    delete softDeleteTimeouts[todoId]

    removeToast(toastId)
  }

  return {
    getTodosForSelectedDay,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    undoDelete,
  }
})
