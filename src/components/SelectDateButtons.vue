<script setup>
import { formatDate } from '@/utils/formatDate'
import { getDates } from '@/utils/getDates'

const { selectedDate } = defineProps({
  selectedDate: String,
})

const dates = getDates()
const emit = defineEmits(['select-new-date'])

const selectDate = (date) => {
  emit('select-new-date', date)
}

const isActive = (date) => selectedDate === date
</script>

<template>
  <div>
    <button
      v-for="date in dates"
      :key="date.id"
      @click="selectDate(date)"
      :class="{ active: isActive(date) }"
    >
      {{ formatDate(date) }}
    </button>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;
  gap: 10px;
}

div::-webkit-scrollbar {
  height: 8px;
}

div::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

div::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

div button {
  min-width: 100px;
  text-decoration: none;
  background-color: var(--color-background-soft);
  border: 0;
  color: var(--color-text);
  font-size: 15px;
  padding: 15px;
  border: 2px solid transparent;

  &:hover {
    cursor: pointer;
    background: transparent;
    border: 2px solid #888;
  }
}

button.active {
  background: transparent;
  border: 2px solid #888;
}
</style>
