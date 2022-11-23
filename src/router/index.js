import { createRouter, createWebHistory } from 'vue-router'


import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import NewArticle from '@/views/NewArticle.vue'
import IndexArticle from '@/views/Articles/IndexArticle.vue'

import ShowArticle from '@/views/Articles/ShowArticle.vue'
import Setting from '@/views/Setting.vue'
import ArticleByTags from '@/views/ArticleByTags.vue'
const routes = [
  { path: '/', name: 'Home', component: IndexArticle },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/newArticle', name: 'EnterArticle', component: NewArticle },
  { path: '/articles', name: 'IndexArticle', component: IndexArticle },
  { path: '/articles/:title', name: 'ShowArticle', component: ShowArticle },
  { path: '/setting', name: 'Setting', component: Setting },
  { path: '/articleByTag', name: 'ArticleByTags', component: ArticleByTags }

]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
