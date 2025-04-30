<script setup>
import { TOAST_TYPES, toastMessages } from '@/constants/toasts'
import StyledButton from './ui/StyledButton.vue'
import { useTodoStore } from '@/stores/todo'

const { toast } = defineProps({
  toast: Object,
})

const todoStore = useTodoStore()

const isDelete = toast.type === TOAST_TYPES.TODO_DELETE
const message = toastMessages[toast.type][toast.status]

const undoDeleteHandler = () => {
  todoStore.undoDelete(toast.id, toast.payload)
}
</script>

<template>
  <div class="toast-item" :class="toast.status">
    <p>{{ message }}</p>
    <StyledButton v-if="isDelete" @click="undoDeleteHandler" :undo="isDelete">Undo</StyledButton>
  </div>
</template>

<style scoped>
.toast-item {
  padding: 0 20px;
  height: 60px;
  width: 250px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: medium;
  border: 1px solid #888;
}

.toast-item.success {
  border-color: var(--toast-success-border);
  background-color: var(--toast-success-bg);
  color: var(--toast-success-text);
}

.toast-item.error {
  border-color: var(--toast-error-border);
  background-color: var(--toast-error-bg);
  color: var(--toast-error-text);
}
</style>
