<script setup>
import { computed, reactive } from 'vue'
import StyledButton from './ui/StyledButton.vue'
import StyledInput from './ui/StyledInput.vue'

const { todo } = defineProps({
  todo: Object,
})

const editState = reactive({
  isEditActive: false,
  updatedTitle: todo.title,
})

const emit = defineEmits(['update-todo', 'remove-todo'])

const emitStatusUpdate = () => {
  emit('update-todo', todo.id, { done: !todo.done })
}

const emitRemove = () => {
  emit('remove-todo', todo.id)
}

const emitTitleUpdate = () => {
  if (editState.updatedTitle.trim().length === 0) {
    emitRemove()
    return
  }

  if (editState.updatedTitle !== todo.title) {
    emit('update-todo', todo.id, { title: editState.updatedTitle })
  } else {
    editState.updatedTitle = todo.title
  }

  editState.isEditActive = false
}

const toggleEdit = () => {
  if (editState.isEditActive) {
    editState.updatedTitle = todo.title
  }

  editState.isEditActive = !editState.isEditActive
}

const editButtonTitle = computed(() => (editState.isEditActive ? 'cancel' : 'edit'))
</script>

<template>
  <div>
    <div>
      <input type="checkbox" :checked="todo.done" @change="emitStatusUpdate" />
      <StyledInput v-if="editState.isEditActive" v-model="editState.updatedTitle"></StyledInput>
      <h4 v-else>{{ todo.title }}</h4>
    </div>
    <div>
      <StyledButton @click="emitTitleUpdate" v-if="editState.isEditActive">save</StyledButton>
      <StyledButton @click="toggleEdit">{{ editButtonTitle }}</StyledButton>
      <StyledButton @click="emitRemove">delete</StyledButton>
    </div>
  </div>
</template>

<style scoped>
div {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

input[type='checkbox'] {
  cursor: pointer;
  width: 20px;
  height: 20px;
}

h4 {
  font-size: 20px;
}
</style>
