import { ref } from 'vue'

const toasts = ref([])

export const useToast = () => {
  const removeToast = (id) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  const showToast = (type, status, payload, duration = 3000) => {
    const newToast = {
      id: crypto.randomUUID(),
      type,
      status,
      payload,
    }

    toasts.value.push(newToast)

    setTimeout(() => {
      removeToast(newToast.id)
    }, duration)
  }

  return { toasts, showToast, removeToast }
}
