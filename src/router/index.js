import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/todos',
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
  const { authState } = useAuth()

  if (to.meta.requiresAuth && !authState.user) {
    next('/auth/login')
  } else if (to.path.startsWith('/auth') && authState.user) {
    next('/todos')
  } else {
    next()
  }
})

export default router
