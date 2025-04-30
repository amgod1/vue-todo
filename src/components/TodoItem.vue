<script setup>
import { computed, reactive, ref, nextTick } from 'vue'
import StyledButton from './ui/StyledButton.vue'
import StyledInput from './ui/StyledInput.vue'

const { todo } = defineProps({
  todo: Object,
})

const inputRef = ref(null)
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

const toggleEdit = async () => {
  if (editState.isEditActive) {
    editState.updatedTitle = todo.title
  }

  editState.isEditActive = !editState.isEditActive

  if (editState.isEditActive) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

const editButtonTitle = computed(() => (editState.isEditActive ? 'Cancel' : 'Edit'))
</script>

<template>
  <section class="todo-item-wrapper">
    <div class="inputs-wrapper">
      <input
        type="checkbox"
        :checked="todo.done"
        :disabled="editState.isEditActive"
        @change="emitStatusUpdate"
        class="checkbox-input"
      />
      <StyledInput
        v-if="editState.isEditActive"
        v-model="editState.updatedTitle"
        ref="inputRef"
        class="edit-input"
      ></StyledInput>
      <p v-else class="todo-text" :class="{ done: todo.done }">{{ todo.title }}</p>
    </div>
    <div class="buttons-wrapper">
      <StyledButton @click="emitTitleUpdate" v-if="editState.isEditActive">Save</StyledButton>
      <StyledButton @click="toggleEdit">{{ editButtonTitle }}</StyledButton>
      <StyledButton @click="emitRemove">Delete</StyledButton>
    </div>
  </section>
</template>

<style scoped>
.todo-item-wrapper {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.inputs-wrapper {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  align-items: center;
}

.checkbox-input {
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.todo-text {
  font-size: 20px;
}

.todo-text.done {
  text-decoration: line-through;
}

.edit-input {
  width: 100%;
}

.buttons-wrapper {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
