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
                    <router-link to="/login" class="nav-link">Login</router-link>
                    <router-link  to="/newArticle" class="nav-link">New Article</router-link>
                    <router-link  to="/setting" class="nav-link">Setting</router-link>
                    <p v-if="showProfile" class="showEmail nav-link">
                        {{ localName }}</p>
                    <p class="nav-link logOut" @click="logOut">LogOut</p>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const showProfile = ref(true)
        const localName = ref(localStorage.getItem('name'))
      
        function logOut() { 
            localStorage.clear()
            showProfile.value = false
            router.push({ path: '/login' })
        }
        return { showProfile,localName, logOut }
    }
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