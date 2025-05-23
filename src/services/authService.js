import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from 'firebase/auth'

export const authService = {
  async signIn(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  },

  async signUp(auth, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  },

  async signOut(auth) {
    await signOutFirebase(auth)
  },
}
