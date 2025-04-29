<script setup>
import { useToast } from '@/composables/useToast'
import ToastItem from '@/components/ToastItem.vue'

const { toasts } = useToast()
</script>

<template>
  <aside class="toast-list-wrapper">
    <ToastItem v-for="toast in toasts" :toast="toast" key="toast.id"></ToastItem>
  </aside>
</template>

<style scoped>
.toast-list-wrapper {
  position: absolute;
  bottom: 20px;
  right: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
