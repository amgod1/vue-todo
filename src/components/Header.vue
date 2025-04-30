<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import StyledButton from './ui/StyledButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleClick = async () => {
  await authStore.signOut()

  router.push('/auth/login')
}
</script>

<template>
  <header class="header">
    <StyledButton @click="handleClick">{{ authStore.user ? 'Logout' : 'Login' }}</StyledButton>
  </header>
</template>

<style>
.header {
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 2px solid var(--color-background-soft);
}
</style>
