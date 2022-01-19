<template>
  <div v-if="this.article">
    <h2>ARTICLE </h2>

      <h2>{{article.title}}</h2>
      <img :src="article.urlToImage" alt="">
      <p>Author: {{article.author}}</p>
      <p>Content: {{article.content}}</p>
      <p>Description: {{article.description}}</p>
      <p>PublishedAt: {{article.publishedAt}}</p>
      <a :href="article.url">Link to article</a>
      <p>Source: {{article.source.name}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      article: null
    }
  },
  computed: {
    ...mapGetters('articlesData', ['singleArticle']),
  },
  created() {
    this.article = this.singleArticle(this.$route.params.id);
  }
}
</script>

<style>

</style>
