import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { authService } from '@/services/authService'

const user = ref(JSON.parse(localStorage.getItem('user')) || null)

export const useAuth = () => {
  const auth = getAuth()

  const isLoading = ref(false)

  const handler = async (callback) => {
    try {
      isLoading.value = true
      await callback()
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const signIn = async (email, password) => {
    await handler(() => authService.signIn(auth, email, password))
  }

  const signUp = async (email, password) => {
    await handler(() => authService.signUp(auth, email, password))
  }

  const signOut = async () => {
    await handler(() => authService.signOut(auth))
  }

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser?.uid) {
      const { uid } = currentUser

      user.value = uid
      localStorage.setItem('user', JSON.stringify(uid))
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
}
