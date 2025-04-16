import { reactive } from 'vue'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const authState = reactive({
  email: '',
  password: '',
  isLoading: false,
  user: localStorage.getItem('user') || null,
})

const setAndSaveUser = (currentUser) => {
  if (currentUser) {
    const userName = currentUser.slice(0, currentUser.indexOf('@'))
    authState.user = userName
    localStorage.setItem('user', userName)
  } else {
    authState.user = null
    localStorage.removeItem('user')
  }
}

export const useAuth = () => {
  const auth = getAuth()

  const resetInputs = () => {
    authState.email = ''
    authState.password = ''
  }

  const onSubmit = async (isLogin) => {
    authState.isLoading = true

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, authState.email, authState.password)
      } else {
        await createUserWithEmailAndPassword(auth, authState.email, authState.password)
      }
    } catch (error) {
      console.error(error)
    }

    authState.isLoading = false
  }

  const logOut = async () => await signOut(auth)

  onAuthStateChanged(auth, (currentUser) => {
    setAndSaveUser(currentUser?.email)
  })

  return {
    authState,
    resetInputs,
    onSubmit,
    logOut,
  }
}
