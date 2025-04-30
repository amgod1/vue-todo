<script setup>
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import StyledInput from './ui/StyledInput.vue'
import StyledButton from './ui/StyledButton.vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

const { isLoginPage } = defineProps({
  isLoginPage: Boolean,
})

const router = useRouter()
const authStore = useAuthStore()

const authFormValues = reactive({
  email: '',
  password: '',
})

const onFormSubmit = async () => {
  let userCredential

  if (isLoginPage) {
    userCredential = await authStore.signIn(authFormValues.email, authFormValues.password)
  } else {
    userCredential = await authStore.signUp(authFormValues.email, authFormValues.password)
  }

  router.push(`/${userCredential.user.uid}/todos`)
}

const isButtonDisabled = computed(
  () => !authFormValues.email.length || !authFormValues.password.length || authStore.isLoading,
)

onBeforeRouteLeave((_, __, next) => {
  authFormValues.email = ''
  authFormValues.password = ''

  next()
})
</script>

<template>
  <form @submit.prevent="onFormSubmit" class="auth-form">
    <StyledInput
      type="email"
      placeholder="email"
      :disabled="authStore.isLoading"
      v-model="authFormValues.email"
    />
    <StyledInput
      type="password"
      placeholder="password"
      :disabled="authStore.isLoading"
      v-model="authFormValues.password"
      minLength="6"
    />
    <StyledButton :disabled="isButtonDisabled" />
  </form>
</template>

<style>
.auth-form {
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
