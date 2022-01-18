<template>
  <div v-if="mainArticles" :style="{gridTemplateColumns: `repeat(${this.userSettings.columns}, 1fr)`}" class="MainArticle_container-div">
    <h2 class="MainArticle_header-h2">Todays Articles:</h2>
    <Article v-for="article in mainArticles" :key=article.id :source="article.source" :author="article.source"
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
    ...mapGetters('userInfo', ['userInfo', 'userSettings'])
  },
  data() {
    return {

    }
  },
  async created() {
    this.fetchMessage('index')
    if (!this.userInfo.session) {
      this.fetchDefaultArticles();
    } else {
      this.fetchUserArticles();
    }
  },
  methods:{
    ...mapActions('articlesData',['fetchDefaultArticles', 'fetchUserArticles', 'deleteArticle']),
    ...mapActions('devMessage', ['fetchMessage'])
  }
}
</script>
