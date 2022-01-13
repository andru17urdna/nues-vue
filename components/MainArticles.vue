<template>
  <div>
    <h1>Todays Articles:</h1>
    <Article v-for="article in defaultArticles" :key=article.title :source="article.source" :author="article.source"
             :content="article.content" :description="article.description" :publishedAt="article.publishedAt"
             :title="article.title" :url="article.url" :urlToImage="article.urlToImage" :delete="false"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NuxtTutorial',
  computed: {
    ...mapGetters('articlesData',['defaultArticles']),

  },
  data() {
    return {

    }
  },
  async created() {
    this.fetchDefaultArticles();
  },
  methods:{
    ...mapActions('articlesData',['fetchDefaultArticles', 'deleteArticle']),
  }
}
</script>

<style>

</style>
