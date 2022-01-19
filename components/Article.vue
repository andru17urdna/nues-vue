<template>


<div v-if="this.singlearticle" class="Article_container-nuxtlink">
  <div :class="[fromMain ? 'Main--Article_container-div' : 'Article_container-div']">
      <p class="Article_source-p" v-if="sourceShow">{{ singlearticle.source.name }}</p>
      <img :src="singlearticle.urlToImage" alt="">
      <h2 class="Article_title-h2">{{ singlearticle.title }}</h2>
      <p v-if="authorShow">Author: {{ singlearticle.author.name }}</p>
      <p v-if="contentShow">Content: {{ singlearticle.content }}</p>
      <p class="Article_description-p" v-if="descriptionShow">Description: {{ singlearticle.description }}</p>
      <p v-if="publishedShow">PublishedAt: {{ singlearticle.publishedAt }}</p>
      <a v-if="linkShow" :href="singlearticle.url">Link to article</a>
      <button class ="Article_delete-btn" v-if="this.deleteable" @click.prevent="deleteArticle(singlearticle.title)">Delete</button>
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
        deleteable: false,
        fromMain: false,
        authorShow: true,
        contentShow: true,
        descriptionShow: true,
        publishedShow: true,
        linkShow: true,
        sourceShow: true,
        addressShow: true,
      }
    },
    props: ['singlearticle', ],
    computed: {
      ...mapGetters('userInfo', ['userInfo']),
      // joinedTitle() {
      //   const hyphenator = this?.title;
      //   return hyphenator?.split(" ").join('-');
      // }
    },
    created() {
      this.article = this.singlearticle;

      this.displaySwitch();
      if (this.location === 'MainArticles') this.fromMain = true;
      if (this.userInfo.session && this.location === 'MainArticles') {
        this.deleteable = true;
      }
    },
    methods:{
        ...mapActions('articlesData',['fetchDefaultArticles', 'deleteArticle']),
        displaySwitch() {
          switch (this.location) {
            case 'MainArticles':{
              this.authorShow = false;
              this.contentShow = false;
              this.linkShow = false;
              this.publishedShow = false;
              break;

            }
            case 'TopHeadlines':{
              this.contentShow = false;
              this.addressShow = false;
              break;

            }
            case 'Search': {

              this.addressShow = false;
              break;
            }
            default:
              break;
          }
        }
    },
}
</script>
