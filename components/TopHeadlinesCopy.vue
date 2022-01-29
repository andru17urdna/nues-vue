<template>
  <v-container class="red">
      <h3>Today's Top-Headlines:</h3>

      <v-carousel
        class="green"
        v-model="model"
        cycle
        continuous
       >
        <v-carousel-item
          v-for="article in headlines"
          :key="article.id"
          nuxt
          :to="'article/' + article.id"
        >



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
