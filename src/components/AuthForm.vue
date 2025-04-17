<script setup>
import StyledInput from './ui/StyledInput.vue'
import StyledButton from './ui/StyledButton.vue'
import { computed } from 'vue'

const { isLoginPage, email, password, isLoading } = defineProps({
  isLoginPage: Boolean,
  email: String,
  password: String,
  isLoading: Boolean,
})

const emit = defineEmits(['update:email', 'update:password', 'submit'])

const emitEmailUpdate = (e) => emit('update:email', e.target.value)
const emitPasswordUpdate = (e) => emit('update:password', e.target.value)
const emitFormSubmit = () => {
  emit('submit')
}

const isButtonDisabled = computed(() => !email.length || !password.length || isLoading)
</script>

<template>
  <form @submit.prevent="emitFormSubmit">
    <StyledInput
      type="text"
      placeholder="email"
      :disabled="isLoading"
      :value="email"
      @input="emitEmailUpdate"
    />
    <StyledInput
      type="password"
      placeholder="password"
      :disabled="isLoading"
      :value="password"
      @input="emitPasswordUpdate"
    />
    <StyledButton :disabled="isButtonDisabled" />
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
