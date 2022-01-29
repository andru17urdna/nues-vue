<template>
  <div>
      <h2>Today's Top-Headlines</h2>
      <v-carousel
      class="pa-6"
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
          <v-sheet
            height="100%"
            tile
            color="blue"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div>
                <p>{{ article.title }}</p>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
  </div>
</template>


<script>
  export default {
    data: () => ({
      model: 0,
      headlines: [],
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }),

    async created(){
        const res = await this.$axios.get(`/api/news/top-headlines`);
        this.headlines = res.data.articles
    }
  }
</script>
