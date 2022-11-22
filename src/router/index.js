import { createRouter, createWebHistory } from 'vue-router'


import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import NewArticle from '@/views/NewArticle.vue'

import IndexArticle from '@/views/Articles/IndexArticle.vue'
import TemplateArticle from '@/views/Articles/TemplateArticle.vue'
import ShowArticle from '@/views/Articles/ShowArticle.vue'
import Setting from '@/views/Setting.vue'
  const routes= [
   {path:'/',name:'Home',component:IndexArticle},
   {path:'/register',name:'Register',component:Register},
   {path:'/login',name:'Login',component:Login},
   {path:'/newArticle',name:'EnterArticle',component:NewArticle},
   {path:'/articles',name:'TemplateArticle',component:TemplateArticle,children:[
     {path:'',name:'IndexArticles',component:IndexArticle},
     {path:':title',name:'ShowArticle',component:ShowArticle}
   ]},
   {path:'/setting',name:'Setting',component:Setting}

  ]
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router
