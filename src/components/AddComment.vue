<template>
    <div class="container mt-5">
        <div class="row d-flex align-items-center justify-content-center">
            <form class="d-flex align-items-center justify-content-center" @submit.prevent="addComment">
                <div class="mb-3 col-8">
                    <textarea v-model="articleText" class="form-control" id="exampleFormControlTextarea1" rows="3"
                        placeholder="Write Your Comment">
                    </textarea>
                    <button class="btn btn-dark mt-1">Add Comment</button>
                </div>
            </form>

            <div v-for="comment in comments">
                <ListComments :comments="comment" />
            </div>
        </div>
    </div>
</template>

<script>

import Swal from 'sweetalert2';
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
import ListComments from './ListComments.vue';

export default {

    setup() {
        const store = useStore()
        const articleText = ref("");
        const localName = localStorage.getItem('name')
        const obj=ref({localName,articleText})
        const comments = computed(() => store.getters.getComments)
        function addComment() {
            if (localStorage.hasOwnProperty("name")) {
                store.dispatch('addComment', obj)
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: "Please First Login Or Register",
                    icon: "error",
                    confirmButtonText: "Ok",
                    timer: 3000
                });
            }
        }
        return { comments, addComment, articleText }
    },
    components: { ListComments }
}
</script>

<style lang="scss" scoped>

</style>