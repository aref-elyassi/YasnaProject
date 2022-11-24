<template>
    <div class="container-fluid d-flex align-items-center justify-content-center">
        <form @submit.prevent="publish"
            class="row w-80 d-flex align-items-center justify-content-center col-md-6 col-sm-12 login-form border rounded p-3 h-50 mt-4">
            <h4 class="errorArticle text-center mt-4">{{firstLogin}}</h4>
            <h1 class="text-center">Please Enter Your Article</h1>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Artice Title</label>
                <input v-model="article" type="text" class="form-control" id="exampleFormControlInput1"
                    placeholder="Artice Title">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Artice About?</label>
                <input v-model="articleSubject" type="text" class="form-control" id="exampleFormControlInput2"
                    placeholder="What Is Article About>">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea v-model="articleText" class="form-control" id="exampleFormControlTextarea1" rows="3"
                    placeholder="Write Your Article(In MarkDown)"></textarea>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput3" class="form-label">Tags</label>
                <input v-model="tags" type="text" class="form-control" id="exampleFormControlInput3"
                    placeholder="Enter Tags">
            </div>
            <h4 class="errorArticle text-center mt-4">{{ErrorArticles}}</h4>

            <button class="btn btn-success">Publish</button>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const store=useStore()
        const article = ref('')
        const articleSubject = ref('')
        const articleText = ref('')
        const tags = ref('')
       const articleAdded=ref({article,articleSubject,articleText,tags})
        const ErrorArticles = ref('')
        const firstLogin = ref('')
         function publish() {
            if (article.value !== '' && articleSubject.value !== '' && articleText.value !== '' &&
             tags.value !== '') {
                if (localStorage.hasOwnProperty("token") ) {
                     store.dispatch('articles/storeArticle', articleAdded)
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'First login',

                    })
                    router.push({ path: '/login' });
                }
            }
            else {
                ErrorArticles.value = 'Fill All Items'
            }
        }


        return { publish, article, articleSubject, articleText, tags, ErrorArticles, firstLogin }
    }
}
</script>

<style  scoped>
.login-form {
    background: #406882;
}

.btn {
    background-color: #EB6440;
}

.btn:hover {
    background-color: #f8b6a3;
}

.errorArticle {
    color: #f1dd00;
}
</style>