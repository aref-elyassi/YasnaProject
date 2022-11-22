<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-5">
                <TagsComponent />
            </div>
            <div class="col-md-7">
                <ArticlesComponent v-for="article in articles" :key="article.id" class="mt-2" :articles="article" />
            </div>
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