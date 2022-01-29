
<template>
  <v-container class="grey lighten-5">
    <h1>Toady</h1>
    <v-row no-gutters>
      <v-col
        v-for="article in mainArticles"
        :key=article.id
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >

<Article :singlearticle="article" :location="'MainArticles'" />
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
