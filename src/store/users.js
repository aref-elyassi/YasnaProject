import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export const users={
namespaced: true,

   
  state: {
    localEmail:localStorage.getItem('email'),
    userName: '',
    token: '',
    email: '',
    isAuthenticated: false,
  },
  getters: {
  
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
    logOutUser(state){
      localStorage.clear()
      state.userName = ''
      state.email = ''
      state.token = ''
    },
    changeUserinfo(state,user){
        state.userName = user.username
        
        localStorage.setItem('token', localStorage.getItem('token'))
        localStorage.setItem('email', localStorage.getItem('email'))
        localStorage.setItem('name', user.username)
     
    }
  },
  actions: {
 
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
    
      return true
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
  async changeSetting({ commit }, payload) {
    const data = {
      user: {
        username: payload.value.nameChange, 
        password: payload.value.passwordChange,
        email:localStorage.getItem('email')
      }
    }
    try {
      const response = await axios.post('https://conduit.productionready.io/api/users', data)
      commit('changeUserinfo', response.data.user)

      commit('setAuthenticationState', !!response.data.user.token)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thanks For Change',
        showConfirmButton: false,
        timer: 2000
      })
     
      return true
    }
    catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There is a problem in change, please try again",
        icon: "error",
        confirmButtonText: "Ok",
      });
     
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
     
      return true
    }
    catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Pleade Enter Correct Data",
        icon: "error",
        confirmButtonText: "Ok",
      });
    
    }
  },
  logOutUser({commit}){
    commit('logOutUser')
    commit('setAuthenticationState', false)
  }
},



  modules: {
}

}
