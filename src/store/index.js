import { createStore } from 'vuex'
import {articles} from '@/store/articles.js'
import {users} from '@/store/users.js'
export default createStore({
  modules: {
    articles,users
}
})
