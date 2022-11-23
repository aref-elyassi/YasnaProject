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
                    <router-link to="/login" class="nav-link" v-if="!isAuthenticate">Login</router-link>
                    <router-link  to="/newArticle" class="nav-link" v-if="isAuthenticate">New Article</router-link>
                    <router-link  to="/setting" class="nav-link" v-if="isAuthenticate">Setting</router-link>
                    <p v-if="isAuthenticate" class="showEmail nav-link">
                        {{ localName }}</p>
                    <p class="nav-link logOut" @click="logOut" v-if="isAuthenticate">LogOut</p>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref,computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
     store:useStore(),
    setup() {
        const router = useRouter()
        const store=useStore()
        const showProfile = ref(true)
        const localName = ref(localStorage.getItem('name'))
        const isAuthenticate=computed(()=>store.getters.isAuthenticated)
        function logOut() { 
           isAuthenticate.value=true
          
            router.push({ path: '/login' })
        }
      
    
   
        return { showProfile,localName, logOut,isAuthenticate }
    },
    
}
</script>

<style  scoped>
.navbar {
    background-color: #1A374D;
}

.nav-link {
    color: rgb(178, 176, 176);
}

.logOut:hover {
    cursor: pointer;
}
</style>