import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export default createStore({
  state: {
    userName: '',
    token: '',
    email: '',
    articles: [],
    isAuthenticated: false,
    tags: [],
    articleByTag: [],
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
      return state.userName
    },
    token(state) {
      return state.token
    },
    email(state) {
      return state.email
    },
    isAuthenticated(state) {
      return state.isAuthenticated || localStorage.getItem('token')
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
      state.userName = user.username
      state.email = user.email
      state.token = user.token
      localStorage.setItem('token', user.token)
      localStorage.setItem('email', user.email)
      localStorage.setItem('name', user.username)
    },
    setAuthenticationState(state, status) {
      state.isAuthenticated = status
    },
    logOutUser(){
      localStorage.clear()
    },
    changeUserinfo(state,user){
      state.userName=user.username
      localStorage.setItem('name', user.username)
      state.email=localStorage.getItem('email')
      state.token=localStorage.getItem('token')
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
 

  async registerUser({ commit }, payload) {
    const data = {
      user: {
        username: payload.value.nameRegister,
        email: payload.value.emailRegister,
        password: payload.value.passwordRegister,
      }
    }
    try {
      const response = await axios.post('https://conduit.productionready.io/api/users', data)
      commit('setUserinfo', response.data.user)
      commit('setAuthenticationState', !!response.data.user.token)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thanks For Register',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(response.data);
      return true
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
  async changeSetting({ commit }, payload) {
    const data = {
      changeuser: {
        username: payload.value.nameChange,
      
        password: payload.value.passwordChange,
      }
    }
    try {
      const response = await axios.post('https://conduit.productionready.io/api/users', data)
      commit('changeUserinfo', response.data.changeuser)
      //commit('setAuthenticationState', !!response.data.user.token)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thanks For Change',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(response.data);
      return true
    }
    catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There is a problem in change, please try again",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error.message);
    }
  },


  async loginUser({ commit }, payload) {
    const data = {
      user: {
        password: payload.value.passwordLogin,
        email: payload.value.emailLogin,
      }
    }
    try {
      const response = await axios.post('https://conduit.productionready.io/api/users/login', data)
      commit('setUserinfo', response.data.user)
      commit('setAuthenticationState', !!response.data.user.token)
      console.log(response.data);
      return true
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
  logOutUser({commit}){
    commit('logOutUser')
  }
},



  modules: {
}
})
