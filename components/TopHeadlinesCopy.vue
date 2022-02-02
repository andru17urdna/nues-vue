<template>
    <div class="dontmove">
      <h2 class="text-center">Today's Top-Headlines</h2>
      <v-container
       class="blue over">
        <v-list flat>
          <v-list-item-group
            color="primary"
          >
            <TopHeadlinesArticle v-for="article in headlines" :article="article"
              :key="article.id" />
          </v-list-item-group>
        </v-list>
      </v-container>
    </div>
</template>


<script>

  export default {
    data: () => ({
        model: 0,
        headlines: [],
    }),
    methods: {},
    async created() {
        const res = await this.$axios.get(`/api/news/top-headlines`);
        this.headlines = res.data.articles;
    },
}
</script>


<style lang="scss">
  .dontmove{
    position: sticky;
    top: 15rem;
  }

  .over{
    height: 40rem;
    overflow-y: scroll;
  }

  .bordered{
    border: 1px solid black;
  }
</style>
