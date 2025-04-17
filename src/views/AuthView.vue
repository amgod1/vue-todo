<script setup>
import { reactive, computed, defineProps } from 'vue'
import { useRouter, RouterLink, onBeforeRouteLeave } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import AuthForm from '@/components/AuthForm.vue'

const router = useRouter()
const authState = reactive({
  email: '',
  password: '',
  isLoading: false,
})

const { isLoginPage } = defineProps({ isLoginPage: Boolean })

const onSubmit = async () => {
  const auth = getAuth()

  authState.isLoading = true

  try {
    if (isLoginPage) {
      await signInWithEmailAndPassword(auth, authState.email, authState.password)
    } else {
      await createUserWithEmailAndPassword(auth, authState.email, authState.password)
    }
  } catch (error) {
    console.error(error)
  }

  authState.isLoading = false

  router.push('/todos')
}

const authViewTitle = computed(() => (isLoginPage ? 'Login Page:' : 'Sign up Page:'))
const authViewLinkTo = computed(() => (isLoginPage ? '/auth/sign-up' : '/auth/login'))
const authViewLinkTitle = computed(() =>
  isLoginPage ? "Don't have an account? Sign up!" : 'Already have an account? Log in!',
)

onBeforeRouteLeave((_, __, next) => {
  authState.email = ''
  authState.password = ''

  next()
})
</script>

<template>
  <main>
    <h2>{{ authViewTitle }}</h2>

    <AuthForm
      :isLoginPage="isLoginPage"
      :isLoading="authState.isLoading"
      v-model:email="authState.email"
      v-model:password="authState.password"
      @submit="onSubmit"
    />

    <RouterLink :to="authViewLinkTo">
      {{ authViewLinkTitle }}
    </RouterLink>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

main a {
  text-decoration: none;
  background: transparent;
  border: 0;
  color: var(--vt-c-indigo);
  font-size: 15px;

  &:hover {
    cursor: pointer;
    color: var(--color-text);
  }
}
</style>
