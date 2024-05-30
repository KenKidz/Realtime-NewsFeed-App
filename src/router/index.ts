import { createRouter, createWebHistory } from 'vue-router'
import { useDataStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/authors',
      name: 'authors',
      component: () => import('../views/AuthorsView.vue')
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/post/_id.vue')
    },
    {
      path: '/author/:id',
      name: 'author',
      component: () => import('../views/author/_id.vue')
    },
  ]
})

router.afterEach((to, from) => {
  const store = useDataStore()
  if(from.name) {
    document.documentElement.scrollTop = 0
    store.closeMenu()
  }
})

export default router
