<template>
    <div>
      <ShowSelectArticle :article="articleByTitle"/>
    </div>
</template>

<script>
 
       

import { computed } from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { useRoute } from 'vue-router'
import ShowSelectArticle from '@/components/ShowSelectArticle.vue'
export default {

    components: { ShowSelectArticle },
    computed: {
        ...mapGetters({ articleByTitle: 'articles/articleByTitle' })
    },
  created() {
    this.fetchArticles().then(() => {
      this.getArticleByTitle(this.$route.params.title)
    })
  },
    methods: {
        ...mapMutations({ getArticleByTitle: 'articles/getArticleByTitle' }),
        ...mapActions({ fetchArticles: 'articles/fetchArticles' })
    },
} 
    
</script>

<style lang="scss" scoped>

</style>
