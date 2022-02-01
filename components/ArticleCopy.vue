<template>
  <v-card
    :loading="loading"
    class="mx-auto"
    :elevation="elevateLvl"
    height="100%"
    @mouseover="elevateLvl = 15"
    @mouseleave="elevateLvl = 10"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-orange"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <div class="d-flex justify-space-between">
      <div class="px-4 rounded-br-lg grey">
        <p class="white-font">{{ singlearticle.source.name || 'Anonymous'}}</p>
      </div>

      <v-btn
          :loading="btnloading"
          :disabled="btndisabled"
          :class="elevateLvl == 15 ? 'hovering-on': 'unhovered'"
          text
          @click="loaderAndDisable(singlearticle)"
        >
          {{ btndisabled ? 'In Queue':'Add to Queue'}}
        </v-btn>
    </div>

    <v-spacer class="py-2"></v-spacer>

    <v-img
      height="250"
      :src="singlearticle.urlToImage"
    ></v-img>

    <v-card-title class="nobreak">{{singlearticle.title}}</v-card-title>

    <v-card-text>

      <div class="my-4 text-subtitle-1">
        {{ singlearticle.description }}
      </div>

      <div class="d-flex justify-end font-weight-bold">{{ singlearticle.author || "Anonymous" }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions
    class="d-flex justify-space-around"
    >
      <v-btn
        color="orange lighten-2"
        text
        @click="viewArticle(singlearticle.id)"
      >
        View Article
      </v-btn>

      <v-btn
        color="red lighten-1"
        text
        @click="deleteArticle(singlearticle.title)"
      >
        Delete
      </v-btn>


    </v-card-actions>

    <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
    >
      Article added to queue.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>


  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Article',
    data() {
      return {

    // Vuetify
      loading: false,
      selection: 1,

    // snackbar duh
      snackbar: false,

    // add to queu button
      btndisabled: false,
      btnloading: false,

    //Switch
      addQueueBtn: true,
      deleteable: false,

    // Elevation on hover
      elevateLvl: 10

      }
    },
    props: ['singlearticle', 'location'],
    computed: {
      ...mapGetters('userInfo', ['userInfo', 'userQueueIds']),
    },
    created() {

    },
    methods:{

    // Vuetify Methods
        viewArticle(id) {
          this.loading = true;
          // THIS IS ABSOLUTELY UNECESSARY :D
          setTimeout(() => {
            this.$router.push("article/" + id);
            this.loading = false;
            return;
          }, 1200)
        },
        loaderAndDisable(article){
          this.btnloading = true;

          setTimeout(() => {
            this.btnloading = false;
            this.snackbar = true;
            this.updateUserQueue(article)
            return;
          }, 800)
          this.btndisabled = true;
        },

    // Component Methods
        ...mapActions('articlesData',['fetchDefaultArticles', 'deleteArticle']),
        ...mapActions('userInfo', ['updateUserQueue']),
        addToQueue(){

        },
    },
}
</script>

<style lang="scss" scoped>
  .nobreak{
    word-break: break-word;
  }

  .white-font{
    color: white;
  }

  .unhovered{
    background: transparent;
    color: #FF9800;
  }
  .hovering-on{
    background: #FFA726;
    color: white;
  }

</style>
