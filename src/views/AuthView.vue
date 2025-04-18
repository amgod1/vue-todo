<script setup>
import { reactive, computed, defineProps } from 'vue'
import { useRouter, RouterLink, onBeforeRouteLeave } from 'vue-router'

import { useAuth } from '@/composables/useAuth'

import AuthForm from '@/components/AuthForm.vue'

const router = useRouter()
const authFormValues = reactive({
  email: '',
  password: '',
})

const { isLoginPage } = defineProps({ isLoginPage: Boolean })
const { isLoading, signIn, signUp } = useAuth()

const onFormSubmit = async () => {
  if (isLoginPage) {
    await signIn(authFormValues.email, authFormValues.password)
  } else {
    await signUp(authFormValues.email, authFormValues.password)
  }

  router.push('/todos')
}

const authViewTitle = computed(() => (isLoginPage ? 'Login Page:' : 'Sign up Page:'))
const authViewLinkTo = computed(() => (isLoginPage ? '/auth/sign-up' : '/auth/login'))
const authViewLinkTitle = computed(() =>
  isLoginPage ? "Don't have an account? Sign up!" : 'Already have an account? Log in!',
)

onBeforeRouteLeave((_, __, next) => {
  authFormValues.email = ''
  authFormValues.password = ''

  next()
})
</script>

<template>
  <main>
    <h2>{{ authViewTitle }}</h2>

    <AuthForm
      :isLoginPage="isLoginPage"
      :isLoading="isLoading"
      v-model:email="authFormValues.email"
      v-model:password="authFormValues.password"
      @submit="onFormSubmit"
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
