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
    <StyledButton v-if="isDelete" @click="undoDeleteHandler">undo</StyledButton>
  </div>
</template>

<style scoped>
.toast-item {
  padding: 20px;
  height: 80px;
  width: 250px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: medium;
  background-color: var(--color-background-soft);
  border: 1px solid #888;
}

.success {
  border: 1px solid greenyellow;
}

.error {
  border: 1px solid red;
}
</style>
