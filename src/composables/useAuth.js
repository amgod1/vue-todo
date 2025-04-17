import { ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const user = ref(localStorage.getItem('user') || null)

export const useAuth = () => {
  const auth = getAuth()

  const logOut = async () => await signOut(auth)

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser?.email) {
      const { email } = currentUser

      const userName = email.slice(0, email.indexOf('@'))
      user.value = userName
      localStorage.setItem('user', userName)
    } else {
      user.value = null
      localStorage.removeItem('user')
    }
  })

  return {
    user,
    logOut,
  }
}
