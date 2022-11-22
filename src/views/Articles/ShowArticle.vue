<template>
    <div>
        <ShowSelectArticle :article="article"/>
    </div>
</template>

<script>
 
       

import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ShowSelectArticle from '@/components/ShowSelectArticle.vue'
export default {
    setup() {
        const store = useStore()
        const router=useRoute()
        const article = computed(() => store.getters.getArticleByTitle(router.params.title))
        return{article}
    },

    components: { ShowSelectArticle }
} 
    
</script>

<style lang="scss" scoped>

</style>