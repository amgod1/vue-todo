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
    <h3>Add new todo:</h3>
    <div>
      <StyledInput :modelValue="modelValue" @update:modelValue="updateInput" class="add-input" />
      <StyledButton @click="handleClick">Add</StyledButton>
    </div>
  </section>
</template>

<style scoped>
section div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.add-input {
  width: 100%;
  height: 50px;
}
</style>
