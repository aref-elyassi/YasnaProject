import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'

export const articles={
namespaced: true,

  state: {
   
    articles: [],
   
    tags: [],
    articleByTag: [],
    articleByTitle: '',

     currentDate : new Date().toJSON().slice(0, 10),
    comments: [
      { id: 1, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi',time:'2022-11-20'  },
      { id: 2, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi',time:'2022-11-19' },
      { id: 3, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi',time:'2022-11-18'  },
      { id: 4, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi',time:'2022-11-17'  },
      { id: 5, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi',time:'2022-11-16' },
      { id: 6, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi',time:'2022-11-15'  },
      { id: 7, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi',time:'2022-11-14' },
    ]


  },
  getters: {
    allArticles(state) {
      return state.articles
    },
    allTags(state) {
      return state.tags
    },
    articleByTitle (state) {
      //return state.articles.find(article => article.title == title)
      return state.articleByTitle
    },
    getArticleByTag(state) {
      return state.articleByTag
    },
    getComments(state) {
      return state.comments
    },
   getTagsByArticle(state){
    return state.getArticleByTag
   }
    
    
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles
    },
    setTags(state, tags) {
      state.tags = tags
    },
    getArticleByTitle (state, title) {
      state.articleByTitle = state.articles.find(article => article.title == title)
    },
    storeArticle(state, article) {
      state.articles.unshift(article)
    },
    showArticleByTag(state, tag) {
      state.articles.forEach(element =>
        element.tagList.filter((tags) => {
          if (tag === tags) {
            state.articleByTag = element
            console.log(element);
          }
          else{
            state.articleByTag.length=0
          }
         
        })
      )
    },
   
   
  },
  actions: {
 
    async fetchArticles({ commit }) {
      try {
        const response = await axios.get('http://api.realworld.io/api/articles')
        commit('setArticles', response.data.articles)

      }
      catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There is a problem, please try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
    async fetchArticleByTitle({ commit }, title) {
      try {
        const response = await axios.get(`http://api.realworld.io/api/articles/${title}`)
        commit('fetchArticleByTitle', response.data)

      }
      catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There is a problem, please try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
    async fetchAllTags({ commit }) {
      try {
        const response = await axios.get('http://api.realworld.io/api/tags')
        commit('setTags', response.data.tags)
      }
      catch (error) {
        console.log(error);
      }
    },

    async storeArticle({ commit }, payload) {
      const data = {
        myarticle: {
          title: payload.value.article,
          description: payload.value.articleSubject,
          body: payload.value.articleText,
          tags:payload.value.tags
        }
      }
      try {
        const response = await axios.get('http://api.realworld.io/api/articles', data)
        commit('storeArticle', response.data.articles)
        Swal.fire({
          title: "Article added",
          icon: "success",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
          toast: true,
          position: 'top',
        });
      }
      catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There is a problem, please try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
    showArticleByTag({ commit }, tag) {
      commit('showArticleByTag', tag)
    },
    addComment(context, comment) {
      //const commentLength = context.state.comments.length
      context.state.comments.unshift({
        id: comment.length,
        body: comment.value.articleText,
        author: comment.value.localName,
        time:new Date().toJSON().slice(0, 10)
      })
    },
 

},



  modules: {
}
}
