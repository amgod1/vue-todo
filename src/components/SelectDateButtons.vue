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
  <div class="buttons-wrapper">
    <button
      v-for="date in dates"
      :key="date.id"
      @click="selectDate(date)"
      class="date-button"
      :class="{ active: isActive(date) }"
    >
      {{ formatDate(date) }}
    </button>
  </div>
</template>

<style scoped>
.buttons-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;
  gap: 10px;
}

.buttons-wrapper::-webkit-scrollbar {
  height: 8px;
}

.buttons-wrapper::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track);
  border-radius: 4px;
}

.buttons-wrapper::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: 4px;
}

.buttons-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-thumb-hover);
}

.date-button {
  min-width: 100px;
  text-decoration: none;
  background-color: var(--color-background-soft);
  border: 0;
  color: var(--color-button-text);
  font-size: 15px;
  padding: 15px;
  border: 2px solid transparent;

  &:hover {
    cursor: pointer;
    color: var(--color-button-hover-text);
    background: var(--color-button-hover-bg);
    border: 2px solid var(--color-button-border);
  }
}

.date-button.active {
  border: 2px solid var(--color-button-border);
}
</style>
