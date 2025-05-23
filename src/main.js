import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import App from './App.vue'
import router from './router'
import { firebaseConfig } from './firebase.config.js'

const pinia = createPinia()
const app = createApp(App)

const firebaseApp = initializeApp(firebaseConfig)
export const db = getDatabase(firebaseApp)

app.use(pinia)
app.use(router)

app.mount('#app')
