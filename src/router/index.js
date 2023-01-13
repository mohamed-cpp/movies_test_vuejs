import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/auth/index.vue'
import MoiveView from '../views/moive/show.vue'
import MoiveSaveView from '../views/moive/save.vue'
import CategoriesView from '../views/categories/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView
    },
    {
      path: '/register',
      name: 'register',
      component: AuthView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/movie/create',
      name: 'createMoive',
      component: MoiveSaveView
    },
    {
      path: '/movie/:name/:id/edit',
      name: 'editMoive',
      component: MoiveSaveView
    },
    {
      path: '/movie/:name/:id',
      name: 'showMoive',
      component: MoiveView
    },
  ]
})

export default router
