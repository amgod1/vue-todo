import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { useToast } from '@/composables/useToast'
import { authService } from '@/services/authService'
import { tryCatchHandler } from '@/utils/tryCatchHandler'
import { TOAST_TYPES } from '@/constants/toasts'

export const useAuthStore = defineStore('auth', () => {
  const auth = getAuth()
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isLoading = ref(false)

  const { showToast } = useToast()

  const signIn = async (email, password) => {
    const { data, status } = await tryCatchHandler(
      () => authService.signIn(auth, email, password),
      isLoading,
    )

    showToast(TOAST_TYPES.SIGN_IN, status)

    return data
  }

  const signUp = async (email, password) => {
    const { data, status } = await tryCatchHandler(
      () => authService.signUp(auth, email, password),
      isLoading,
    )

    showToast(TOAST_TYPES.SIGN_UP, status)

    return data
  }

  const signOut = async () => {
    const { data, status } = await tryCatchHandler(() => authService.signOut(auth), isLoading)

    showToast(TOAST_TYPES.SIGN_OUT, status)

    return data
  }

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser?.uid) {
      user.value = currentUser.uid
      localStorage.setItem('user', JSON.stringify(currentUser.uid))
    } else {
      user.value = null
      localStorage.removeItem('user')
    }
  })

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  }
})
