<script setup>
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import StyledInput from './ui/StyledInput.vue'
import StyledButton from './ui/StyledButton.vue'

const { isLoginPage } = defineProps({ isLoginPage: Boolean })

const { authState, onSubmit } = useAuth()

const router = useRouter()

const onSubmitHandler = async (isLogin) => {
  console.log('submittin', authState.email, authState.password)

  await onSubmit(isLogin)

  router.push('/todos')
}
</script>

<template>
  <form @submit.prevent="onSubmitHandler(isLoginPage)">
    <StyledInput
      type="text"
      placeholder="email"
      v-model="authState.email"
      :disabled="authState.isLoading"
    />
    <StyledInput
      type="password"
      placeholder="password"
      v-model="authState.password"
      :disabled="authState.isLoading"
    />
    <StyledButton
      :disabled="!authState.email.length || !authState.password.length || authState.isLoading"
    />
  </form>
</template>

<style>
form {
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
