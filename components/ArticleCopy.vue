<template>
  <v-card
    :loading="loading"
    class="mx-auto my-6"

  >
    <template slot="progress">
      <v-progress-linear
        color="deep-orange"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="article.urlToImage"
    ></v-img>

    <v-card-title class="nobreak">{{article.title}}</v-card-title>

    <v-card-text>

      <div class="my-4 text-subtitle-1">
        {{ singlearticle.author || "Anonymous" }} --
        {{ singlearticle.source.name || "Anonymous" }}
      </div>

      <div>{{ article.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        @click="viewArticle(article.id)"
      >
        View Article
      </v-btn>

      <v-btn
        color="red lighten-1"
        text
      >
        Delete
      </v-btn>

      <v-btn
        color="orange"
        text
      @click="snackbar = true"

      >
        Add to Queue
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

      snackbar: false,
      text: `Hello, I'm a snackbar`,


      //Switch
        article: null,
        addQueueBtn: true,
        deleteable: false,
        fromMain: false,
        authorShow: true,
        contentShow: true,
        descriptionShow: true,
        publishedShow: true,
        linkShow: true,
        sourceShow: true,
        addressShow: true,
        currentClass: 'Article_container-div'
      }
    },
    props: ['singlearticle', 'location'],
    computed: {
      ...mapGetters('userInfo', ['userInfo', 'userQueueIds']),
    },
    created() {
      this.article = this.singlearticle;

      this.displaySwitch();
      if (this.location === 'MainArticles') this.fromMain = true;
      if (this.userInfo.session && this.location === 'MainArticles') {
        this.deleteable = true;
      }
    },
    watch: {

    },
    methods:{

    // Vuetify Methods
          viewArticle(id) {
          this.loading = true
          // THIS IS ABSOLUTELY UNECESSARY :D
          setTimeout(() => {
            this.$router.push("article/" + id)
            this.loading = false
            return;
          }, 1200)

        },



    // Component Methods
        ...mapActions('articlesData',['fetchDefaultArticles', 'deleteArticle']),
        ...mapActions('userInfo', ['updateUserQueue']),
        addToQueue(){

        },
        displaySwitch() {
          switch (this.location) {
            case 'MainArticles':{
              this.authorShow = false;
              this.contentShow = false;
              this.linkShow = false;
              this.publishedShow = false;
              this.currentClass = 'Main--Article_container-div';
              break;

            }
            case 'TopHeadlines':{
              this.contentShow = false;
              this.addressShow = false;
              this.sourceShow = false;
              this.currentClass = 'TopHeadlines--Article_container-div'
              break;

            }
            case 'Search': {

              this.addressShow = false;
              break;
            }
            case 'Queue': {
              this.descriptionShow = false;
              this.addQueueBtn = false;
              this.sourceShow = false;
            }
            default:
              break;
          }
        }
    },
}
</script>

<style lang="scss" scoped>
  .nobreak{
    word-break: break-word;
  }

</style>
