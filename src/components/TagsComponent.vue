<template>


    <section class="d-flex align-items-center justify-content-around flex-column"><span v-for="tag in tags"
            class="badge bg-secondary mt-2" @click="showArticles(tag)">{{tag}}</span>
    </section>

</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'


export default {

    setup() {
        const store = useStore()
        const tags = computed(() => store.getters.allTags)
        async function fetchTags() {
            await store.dispatch("fetchAllTags");
        }
         function showArticles(tag){
            console.log(tag);
        }
        fetchTags();

        return { fetchTags,showArticles, tags }
    }

}
</script>

<style  scoped>
.badge{
    cursor: pointer;
}
</style>