<template>
  <v-container class="transparent pl-10 pr-10">
      <h3>Today's Top-Headlines:</h3>

      <v-carousel
        class="transparent"
        v-model="model"
        cycle
        continuous
        hide-delimiters
        progress
        progress-color="orange"
        height="100"
        show-arrows-on-hover
       >
        <v-carousel-item
          v-for="article in headlines"
          :key="article.id"
          nuxt
          :to="'article/' + article.id"
        >
            <v-sheet
              :color="'transparent'"
              height="100%"
              tile
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="transparent py-0 mx-10">
                  <h3>{{ article.title }}</h3>
                </div>
              </v-row>
            </v-sheet>


        </v-carousel-item>
      </v-carousel>
  </v-container>
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
  .sstuff{
    height: 200px;
  }
  .carousel{
    color: red;
  }
</style>
