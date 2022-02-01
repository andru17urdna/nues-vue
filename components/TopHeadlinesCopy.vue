<template>
    <div class="dontmove">
      <h2 class="text-center">Today's Top-Headlines</h2>
      <v-container
       class="blue over">
          <v-list
           three-line>
              <v-list-item
                class="bordered"
              :outlined="true"
                v-for="article in headlines"
                :key="article.id"
              >
                <v-list-item-avatar
                  :rounded="true"
                >
                  <v-img :src="article.urlToImage"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="article.title"></v-list-item-title>
                    <v-divider></v-divider>
                  <v-list-item-subtitle v-html="article.description"></v-list-item-subtitle>
                  <v-list-item-subtitle v-text="article.source.name"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
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

    async created(){
        const res = await this.$axios.get(`/api/news/top-headlines`);
        this.headlines = res.data.articles
    }
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
