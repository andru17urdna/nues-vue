<template>
  <div v-if="this.singlearticle" class="Article_wrapper-div">
    <div :class="currentClass">
      <button v-if="addQueueBtn" class="Article_add-btn" @click.prevent="updateUserQueue(article)">Add to Queue</button>
        <p class="Article_source-p" v-if="sourceShow">{{ singlearticle.source.name || "Anonymous" }}</p>
        <img :src="singlearticle.urlToImage" alt="">
        <h2 class="Article_title-h2">{{ singlearticle.title }}</h2>
        <p class="Article_author-p" v-if="authorShow">{{ singlearticle.author || "Anonymous" }}</p>
        <p v-if="contentShow">{{ singlearticle.content }}</p>
        <p class="Article_description-p" v-if="descriptionShow">{{ singlearticle.description }}</p>
        <p class="Article_published-p" v-if="publishedShow">{{ singlearticle.publishedAt }}</p>
        <a class="Article_link-a" v-if="linkShow" :href="singlearticle.url">Link to article</a>
        <button class="Article_delete-btn"
                v-if="this.deleteable"
                @click.prevent="deleteArticle(singlearticle.title)">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Article',
    data() {
      return {
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
        ...mapActions('articlesData',['fetchDefaultArticles', 'deleteArticle']),
        ...mapActions('userInfo', ['updateUserQueue']),
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
