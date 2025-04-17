<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import StyledButton from './ui/StyledButton.vue'

const router = useRouter()
const { user, logOut } = useAuth()

const handleClick = async () => {
  if (user.value) {
    await logOut()
  }

  router.push('/auth/login')
}
</script>

<template>
  <header>
    <h2>{{ user }}</h2>
    <StyledButton @click="handleClick">{{ user ? 'Logout' : 'Login' }}</StyledButton>
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
