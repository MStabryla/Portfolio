import { createWebHistory, createRouter } from 'vue-router'

import Main from './components/Main.vue'
import Repositories from './components/Repositories.vue';
import Main_Repo from './components/Main_Repo.vue';

const routes = [
  { path: '/', component: Main, meta: { lang: 'pl' } },
  { path: '/en', component: Main, meta: { lang: 'en' } },
  { path: '/repos', component: Main_Repo, meta: { lang: 'pl' } },
  { path: '/en/repos', component: Main_Repo, meta: { lang: 'en' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;