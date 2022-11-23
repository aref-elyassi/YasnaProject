import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export default createStore({
  state: {
    username: '',
    token: '',
    email: '',
    isAuthenticated: false,
    articles: [],
    tags: [],
    articleByTag: [],
    comments: [
      { id: 1, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi' },
      { id: 2, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi' },
      { id: 3, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi' },
      { id: 4, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi' },
      { id: 5, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi' },
      { id: 6, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi' },
      { id: 7, body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit deleniti consectetur? Provident, omnis earum nam facilis minus est unde iusto odit quasi temporibus culpa sed dolores tempore totam inventore, illo dolorum repellendus. Voluptatibus sequi ad deleniti deserunt, tempore ratione quia molestias earum ducimus nulla tenetur cum ea repellendus id?', author: 'Aref Elyassi' },
    ]


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
    getArticleByTag(state) {
      return state.articleByTag
    },
    getComments(state) {
      return state.comments
    },
    userName(state) {
      return state.username
    },
    token(state) {
      return state.token
    },
    email(state) {
      return state.email
    },
    isAuthenticated(state){
      return state.isAuthenticated
    }


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
    showArticleByTag(state, tag) {
      state.articles.forEach(element =>
        element.tagList.filter((tags) => {
          if (tag === tags) {
            state.articleByTag = element
            console.log(element);
          }

        })
      )
    },
    setUserinfo(state, user) {
      state.username = user.user_name
      state.email = user.email,
        state.token = user.token
      },
      setUserlogin(state,user){
        state.email=user.email,
        state.token=user.token
        state.isAuthenticated=true
      
    }


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

    async storeArticle({ commit }, title, about, body, tags) {
      try {
        const response = await axios.get('http://api.realworld.io/api/articles', {
          title: title,
          description: about,
          body: body,
          tagList: tags
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
    },
    showArticleByTag({ commit }, tag) {
      commit('showArticleByTag', tag)
    },
    addComment(context, comment) {
      console.log(comment);
      context.state.comments.unshift(comment)
    },

    async registerUser({ commit }, payload) {

      const data = {
        user: {
          user_name: payload.value.nameRegister,
          email: payload.value.emailRegister,
          password: payload.value.passwordRegister
        }
      }
      try {
        const response = await axios.post('https://conduit.productionready.io/api/users', data)
        if(response.status==200){
          commit('setUserinfo', response.data.token)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('email',response.data.email)
          console.log(response.data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thanks For Register',
            showConfirmButton: false,
            timer: 2000
          })
          console.log(response.data);
        }
      }
      catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There is a problem, please try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(error.message);
      }
    },
    async loginUser({ commit }, payload) {
      const data = {
        user: {
       
          email: payload.emailRegister,
          password: payload.passwordRegister
        }
      }
      try {
        const response = await axios.post('https://conduit.productionready.io/api/users/login', data)
        commit('setUserlogin', response.data.token)
        console.log(response.data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thanks For Login',
          showConfirmButton: false,
          timer: 2000
        })
        console.log(response.data);
      }
      catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There is a problem, please try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(error.message);
      }
    }
  },
  modules: {
  }
})
