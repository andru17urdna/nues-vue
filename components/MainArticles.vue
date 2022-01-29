<template>
  <div>
    <h2>Todays Articles:</h2>

    <WrapperNuxtLink v-for="article in mainArticles" :key=article.id :url="article.id">
        <Article :singlearticle="article" :location="'MainArticles'" />
    </WrapperNuxtLink>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
      this.fetchUserArticles(this.userInfo.favorited);
    }
  },
  methods:{
    ...mapActions(
        'articlesData',[
              'fetchDefaultArticles',
              'fetchUserArticles',
              'deleteArticle'
        ]),
    ...mapActions('devMessage', ['fetchMessage'])
  }
}
</script>
