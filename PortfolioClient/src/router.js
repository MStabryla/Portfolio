import { createWebHistory, createRouter } from 'vue-router'

import Main from './components/Main.vue'

const routes = [
  { path: '/', component: Main, meta: { lang: 'pl' } },
  { path: '/en', component: Main, meta: { lang: 'en' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;