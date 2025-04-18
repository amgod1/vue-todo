import { ref } from 'vue'
import { useAuth } from './useAuth'
import { todoService } from '@/services/todoService'

export const useTodo = () => {
  const todos = ref({})
  const { user } = useAuth()

  const getTodosForSelectedDay = (selectedDate) => {
    const dayTodos = todos.value[selectedDate]
    return dayTodos ? Object.values(todos.value[selectedDate]) : []
  }

  const handler = async (callback) => {
    try {
      await callback()
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  const fetchTodos = async () => {
    if (!user.value) return

    handler(() =>
      todoService.getList(user.value, (updatedTodos) => {
        todos.value = updatedTodos
      }),
    )
  }

  const createTodo = async (date, title) => {
    if (!user.value) return

    await todoService.create(user.value, date, title)
  }

  const updateTodo = async (date, id, updateDto) => {
    if (!user.value) return

    await todoService.update(user.value, date, id, updateDto)
  }

  const deleteTodo = async (date, id) => {
    if (!user.value) return

    await todoService.delete(user.value, date, id)
  }

  return {
    getTodosForSelectedDay,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  }
}
