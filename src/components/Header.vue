<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import StyledButton from './ui/StyledButton.vue'

const router = useRouter()
const { authState, logOut } = useAuth()

const handleClick = async () => {
  if (authState.user) {
    await logOut()
  }

  router.push('/auth/login')
}
</script>

<template>
  <header>
    <h2>{{ authState.user }}</h2>
    <StyledButton @click="handleClick">{{ authState.user ? 'Logout' : 'Login' }}</StyledButton>
  </header>
</template>

<style>
header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--color-background-soft);
}
</style>
