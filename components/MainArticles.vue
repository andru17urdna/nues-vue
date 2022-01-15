<template>
  <div class="MainArticle_container-div">
    <h2 class="MainArticle_header-h2">Todays Articles:</h2>
    <p v-if="this.userInfo.session">When logged in a request is made with a users favorited search strings</p>
    <Article v-for="article in mainArticles" :key=article.title :source="article.source" :author="article.source"
             :content="article.content" :description="article.description" :publishedAt="article.publishedAt"
             :title="article.title" :url="article.url" :urlToImage="article.urlToImage" :location="'MainArticles'"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainArticles',
  computed: {
    ...mapGetters('articlesData',['mainArticles']),
    ...mapGetters('userInfo', ['userInfo'])
  },
  data() {
    return {

    }
  },
  async created() {
    if (!this.userInfo.session) {
      this.fetchDefaultArticles();
    } else {
      this.fetchUserArticles();
    }
  },
  methods:{
    ...mapActions('articlesData',['fetchDefaultArticles', 'fetchUserArticles', 'deleteArticle']),
  }
}
</script>

<style>

</style>
