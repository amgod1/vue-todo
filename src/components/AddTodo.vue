<script setup>
import StyledButton from './ui/StyledButton.vue'
import StyledInput from './ui/StyledInput.vue'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue', 'create-todo'])

const updateInput = (value) => {
  emit('update:modelValue', value)
}

const handleClick = () => {
  emit('create-todo')
}
</script>

<template>
  <section>
    <h2>Add new todo:</h2>
    <div class="input-wrapper">
      <StyledInput :modelValue="modelValue" @update:modelValue="updateInput" class="add-input" />
      <StyledButton @click="handleClick">Add</StyledButton>
    </div>
  </section>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.add-input {
  width: 100%;
}
</style>
