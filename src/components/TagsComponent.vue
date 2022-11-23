<template>
    <div class="container-fluid">
        <div class="row border rounded  py-2">
            <div>
                <h4>Popular Tags</h4>
                <section class="d-flex   flex-wrap ">
                    <span v-for="tag in tags" class="badge bg-secondary m-1" @click="showArticlesByTags(tag)">{{ tag
                    }}</span>
                </section>
            </div>
            <hr>
            <section>
                <div class="container" v-if="showHideComponent">
                    <div class="row">
                        <section class="col-md-12 rounded border mt-2 p-3">
                            <section class="d-flex align-items-center justify-content-around">

                                <p>{{ articleByTags.createdAt }}</p>
                            </section>

                            <h5 class="mt-3 bg-info p-3 rounded text-justify">
                                {{ articleByTags.title }}
                            </h5>
                            <hr>
                            <p class="text-justify">
                                {{ articleByTags.body }}
                            </p>
                            <p>{{ articleByTags.description }}</p>
                            <section class="d-flex align-items-center justify-content-between mt-5">
                                <div>
                                    <span class="badge text-bg-primary m-1" v-for="tags in articleByTags.tagList">{{
                                            tags
                                    }}</span>
                                </div>

                            </section>
                            <AddComment />
                        </section>
                    </div>
                </div>
            </section>
        </div>

    </div>
</template>

<script>
import { computed,ref } from 'vue'
import { useStore } from 'vuex'


export default {

    setup() {
        const showHideComponent = ref(false)
        const store = useStore()
        const tags = computed(() => store.getters.allTags)
        const articleByTags = computed(() => store.getters.getArticleByTag)
        async function fetchTags() {
            await store.dispatch('fetchAllTags');
        }

        function showArticlesByTags(tag) {
            if (tag !== '') {
                showHideComponent.value = true
            }
            console.log(tag);
            store.dispatch('showArticleByTag', tag)
        }
        fetchTags();

        return { fetchTags, showArticlesByTags, tags, articleByTags, showHideComponent }
    },


}
</script>

<style  scoped>
.badge {
    cursor: pointer;
}
</style>