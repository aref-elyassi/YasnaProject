<template>
        <div class="container-fluid">
            <div class="row">
                <div>
                    <div class="card">
                        <div class="d-flex align-items-center justify-content-center flex-column mt-2">
                            <hr>
                            <div class="d-flex align-items-center justify-content-center">
                                <h3>{{ articles.author.username }}</h3>
                                <img class="rounded" :src="articles.author.image" alt="">
                            </div>
                            <small>{{ articles.createdAt }}</small>
                        </div>
                        <div class="card-body">
                            <h1>Title</h1>
                            <router-link class="router" :to="{name:'ShowArticle',params:{title:articles.title}}">{{articles.title}}></router-link>
                        
                            <hr>
                            <h1>Body</h1>
                            <p class="p" v-if="!readMoreActivated">{{ articles.body.slice(0, 100) }}
                                <span class="text-primary" role="button" v-if="!readMoreActivated"
                                    @click="activateReadMore">..read more</span>
                            </p>
                            <p v-else>{{ articles.body }}</p>
                            <div class="row d-flex align-items-center justify-content-between">
                                <div class="listOfTags  col-md-8">
                                    <span class="badge text-bg-primary m-1"
                                        v-for="tags in articles.tagList">{{ tags }}</span>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: ["articles"],
    setup() {
        const readMoreActivated = ref(false);
        function activateReadMore() {
            readMoreActivated.value = true;
        }
        return { readMoreActivated, activateReadMore };
    },

}
</script>

<style  scoped>
img {
    width: 2rem;
    height: 2rem;
}

.addFavorite{
    cursor: pointer;
    transition: all .5s ease-in-out;
}
.addFavorite:hover{
    background-color: rgb(13, 157, 0);
}
.addFavorite>i{
    font-size: 1.3rem;
    transition: all .5s ease-in-out;

}
.addFavorite:hover>i{
    color: rgb(24, 246, 4);
}
.router{
    text-decoration: none;
    color: rgb(106, 106, 106);
}
.router:hover{
    color: black;
}
</style>