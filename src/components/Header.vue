<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link v-if="!isAuthenticated" to="/login" class="nav-link">
                        Login</router-link>
                        <router-link to="/newArticle" class="nav-link" v-if="isAuthenticated">New Article</router-link>
                        <router-link to="/setting" class="nav-link" v-if="isAuthenticated">Setting</router-link>
                        <p v-if="isAuthenticated" class="showEmail nav-link">
                            {{ localName }}</p>
                            <p v-if="isAuthenticated" class="nav-link logOut" @click="logOut">LogOut</p>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, useStore } from 'vuex'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const showProfile = ref(true)
        const localName = ref(localStorage.getItem('email'))
        //var isAuthenticated = computed(() => store.getters.isAuthenticated)
        function logOut() {
          store.dispatch('users/logOutUser').then(()=>{
              window.location.reload()
              router.push({path:'/'})
          })
        }
        return { showProfile, localName, logOut }
    },
    computed: {
        ...mapGetters({ isAuthenticated: 'users/isAuthenticated' })
    },
}
</script>

<style  scoped>
.navbar {
    background-color: #256D85;
}

.nav-link {
    color: rgb(178, 176, 176);
}

.logOut:hover {
    cursor: pointer;
}
</style>
