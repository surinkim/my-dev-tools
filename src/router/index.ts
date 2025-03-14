import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/json',
      name: 'json',
      // 지연 로딩을 통한 코드 분할
      component: () => import('../views/JsonUtilView.vue')
    },
    {
      path: '/base64',
      name: 'base64',
      component: () => import('../views/Base64UtilView.vue')
    }
  ]
})

export default router