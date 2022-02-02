<template>
  <div>
      <h1 class="text-center">Today's Articles:</h1>
    <v-container>
      <v-row>
        <v-col
        cols="12"
          lg="4"
          md="6"
          v-for="article in mainArticles"
          :key=article.id
        >
          <v-card
            tile
            class="py-5 px-2"
            outlined
            color="transparent"
            height="100%"
          >
            <ArticleCopy
                :singlearticle="article"
                :location="'MainArticles'" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
