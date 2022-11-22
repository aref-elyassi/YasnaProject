import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export default createStore({
  state: {
    articles: [],
    tags: [],
    

  },
  getters: {
    allArticles(state) {
      return state.articles
    },
    allTags(state) {
      return state.tags
    },
    getArticleByTitle: (state) => (title) => {
      return state.articles.find(article => article.title == title)

  },
   

  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles
    },
    setTags(state, tags) {
      state.tags = tags
    },
   
    storeArticle(state, article) {
      state.articles.unshift(article)
    },
 

  },
  actions: {
    async fetchArticles({ commit }) {
      try {
        const response = await axios.get('http://api.realworld.io/api/articles')
        commit('setArticles', response.data.articles)
        console.log(response.data.articles);
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
    async fetchArticleByTitle({commit},title){
      try{
        const response=await axios.get(`http://api.realworld.io/api/articles/${title}`)
        commit('fetchArticleByTitle',response.data)
        console.log(response.data);
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
        console.log(response.data.tags);
      }
      catch (error) {
        console.log(error);
      }
    },
   
    async storeArticle({ commit }, title, about, body, tags) {
      try {
        const response = await axios.get('http://api.realworld.io/api/articles', {
          title: title,
          description: about,
          body: body,
          tagList:tags
        })
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
    }

  },
  modules: {
  }
})
