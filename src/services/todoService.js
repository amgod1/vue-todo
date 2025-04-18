import { db } from '@/main'
import { ref, set, push, update, remove, onValue } from 'firebase/database'

export const todoService = {
  getList(userId, callback) {
    const userRef = ref(db, `users/${userId}`)

    onValue(userRef, (snapshot) => {
      const todos = snapshot.val() || {}
      callback(todos)
    })
  },

  async create(userId, date, todoTitle) {
    const newTodoRef = push(ref(db, `users/${userId}/${date}`))

    const todo = {
      id: newTodoRef.key,
      title: todoTitle,
      done: false,
    }

    await set(newTodoRef, todo)
  },

  async update(userId, date, id, updateDto) {
    const todoRef = ref(db, `users/${userId}/${date}/${id}`)

    await update(todoRef, updateDto)
  },

  async delete(userId, date, id) {
    const todoRef = ref(db, `users/${userId}/${date}/${id}`)

    await remove(todoRef)
  },
}
