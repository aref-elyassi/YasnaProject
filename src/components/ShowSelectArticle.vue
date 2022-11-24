<template>
    <div class="container">
        <div class="row">
            <section class="col-md-12 rounded border mt-2 p-3">
                <section class="d-flex align-items-center justify-content-around">
                    <section class="d-flex">
                        <h3>
                            {{ article.author.username }}
                        </h3>
                        <img :src=article.author.image alt="" class="rounded">
                    </section>
                    <p>Created At:{{ article.createdAt }}</p>
                </section>

                <h5 class="mt-3 bg-info p-3 rounded text-justify">
                    {{ article.title }}
                </h5>
                <hr>
                <p class="text-justify">
                    {{ article.body }}
                </p>
                <p>{{ article.description }}</p>
                <section class="d-flex align-items-center justify-content-between mt-5">
                    <div>
                        <span class="badge text-bg-primary m-1" v-for="tags in article.tagList">{{ tags }}</span>
                    </div>
                    <div class="border rounded bg-light px-3 text-danger article-like" @click="likeArticle"><i
                            class="bi bi-suit-heart-fill "></i>{{ article.favoritesCount }}</div>
                </section>
                <AddComment />
            </section>
        </div>
    </div>
</template>

<script>
import AddComment from '@/components/AddComment.vue'
import Swal from 'sweetalert2';
export default {
    props: ["article"],
    components: {
        AddComment
    },
    setup(props) {

        function likeArticle() {
            if (localStorage.hasOwnProperty("token") ) {
                props.article.favoritesCount++
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: "Please First Login Or Register To Like This Article",
                    icon: "error",
                    timer: 3000
                });
            }
        }
        return { likeArticle }
    }

}
</script>

<style  scoped>
.article-like {
    cursor: pointer;
}
</style>