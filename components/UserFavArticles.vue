<!-- Please remove this file from your project -->
<template>
  <div>
    <h1>Articles from you Favorited searches</h1>
    <Article v-for="article in userFavorite" :key=article.title :source="article.source" :author="article.source"
             :content="article.content" :description="article.description" :publishedAt="article.publishedAt"
             :title="article.title" :url="article.url" :urlToImage="article.urlToImage"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NuxtTutorial',
  computed: {
    ...mapGetters('userFavArticles', ['userFavorite'])
  },
  data() {
    return {

    }
  },
  async created() {
    this.fetchUserFavorite();
  },
  methods:{
    ...mapActions('userFavArticles', ['fetchUserFavorite'])
  }
}
</script>

<style>

</style>
