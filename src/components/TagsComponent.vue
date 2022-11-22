<template>
    <section class="d-flex align-items-center justify-content-around flex-column border rounded py-2">
        <h4>Popular Tags</h4>
        <span v-for="tag in tags"
            class="badge bg-secondary mt-2" @click="showArticlesByTags(tag)">{{tag}}</span>
    </section>
    <section>
        {{articleByTags.title}}
    </section>

</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'


export default {

    setup() {
        const store = useStore()
        const tags = computed(() => store.getters.allTags)
      
        const  articleByTags=computed(()=>store.getters.getArticleByTag)
       
        async function fetchTags() {
            await store.dispatch("fetchAllTags");
        }
        
        function showArticlesByTags(tag){
             console.log(tag);
           store.dispatch('showArticleByTag',tag)
        }
        fetchTags();

        return { fetchTags,showArticlesByTags, tags,articleByTags }
    }

}
</script>

<style  scoped>
.badge{
    cursor: pointer;
}
</style>