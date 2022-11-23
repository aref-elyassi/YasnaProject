<template>
    <div class="container mt-5">
        <div class="row">
          
            <TagsComponent />
            <h1 class="text-center mt-4">All Articles</h1>
            <hr>
            <ArticlesComponent v-for="article in articles" :key="article.id" class="mt-2" :articles="article" />
        </div>
    </div>
    <p></p>

</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import ArticlesComponent from '@/components/ArticlesComponent.vue'
import TagsComponent from '@/components/TagsComponent.vue'
export default {
    components: {
        ArticlesComponent,
        TagsComponent
    },
    setup() {
        const store = useStore()
        const articles = computed(() => store.getters.allArticles)
        async function fetchArticles() {
            await store.dispatch("fetchArticles");
        }
        fetchArticles();

        return { articles }
    }

}
</script>

<style lang="scss" scoped>

</style>