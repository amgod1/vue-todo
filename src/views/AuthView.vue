<script setup>
import { computed, defineProps } from 'vue'
import { RouterLink, onBeforeRouteLeave } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthForm from '@/components/AuthForm.vue'

const { isLoginPage } = defineProps({ isLoginPage: Boolean })
const { resetInputs } = useAuth()

const authViewTitle = computed(() => (isLoginPage ? 'Login Page:' : 'Sign up Page:'))
const authViewLinkTo = computed(() => (isLoginPage ? '/auth/sign-up' : '/auth/login'))
const authViewLinkTitle = computed(() =>
  isLoginPage ? "Don't have an account? Sign up!" : 'Already have an account? Log in!',
)

onBeforeRouteLeave((_, __, next) => {
  resetInputs()
  next()
})
</script>

<template>
  <main>
    <h2>{{ authViewTitle }}</h2>

    <AuthForm :isLoginPage="isLoginPage" />

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
