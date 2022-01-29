<template>
  <v-container class="grey mt-10">
    <h1>Today's Articles:</h1>
    <v-row>
      <v-col
        v-for="article in mainArticles"
        :key=article.id
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <v-card
          tile
          class="pa-2"
          outlined
        >

          <ArticleCopy
              :singlearticle="article"
              :location="'MainArticles'" />


        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
