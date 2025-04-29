import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:uid/todos',
      name: 'Todos',
      component: TodoView,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('../views/AuthView.vue'),
      props: {
        isLoginPage: true,
      },
    },
    {
      path: '/auth/sign-up',
      name: 'SignUp',
      component: () => import('../views/AuthView.vue'),
      props: {
        isLoginPage: false,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/auth/login',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user) {
    next('/auth/login')
  } else if (to.path.startsWith('/auth') && authStore.user) {
    next(`/${authStore.user}/todos`)
  } else {
    next()
  }
})

export default router
