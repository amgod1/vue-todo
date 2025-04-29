<script setup>
import Header from '@/components/Header.vue'
import ToastList from '@/components/ToastList.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />
  <ToastList />
  <RouterView />
</template>
