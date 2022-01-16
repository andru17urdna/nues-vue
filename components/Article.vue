<template>
<nuxt-link class="Article_container-nuxtlink" :to="'article/' +  joinedTitle">
  <div :class="[fromMain ? 'Main--Article_container-div' : 'Article_container-div']">
      <p class="Article_source-p" v-if="sourceShow">{{source.name}}</p>
      <img :src="urlToImage" alt="">
      <h2 class="Article_title-h2">{{title}}</h2>
      <p v-if="authorShow">Author: {{author.name}}</p>
      <p v-if="contentShow">Content: {{content}}</p>
      <p class="Article_description-p" v-if="descriptionShow">Description: {{description}}</p>
      <p v-if="publishedShow">PublishedAt: {{publishedAt}}</p>
      <a v-if="linkShow" :href="url">Link to article</a>
      <button class ="Article_delete-btn" v-if="this.deleteable" @click="deleteArticle(title)">Delete</button>
  </div>
</nuxt-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Article',
    data() {
      return {
        deleteable: false,
        fromMain: false,
        authorShow: true,
        contentShow: true,
        descriptionShow: true,
        publishedShow: true,
        linkShow: true,
        sourceShow: true,
      }
    },
    props: ['source', 'author', 'content', 'description', 'publishedAt', 'title', 'url', 'urlToImage', 'theArticle', 'location'],
    computed: {
      ...mapGetters('userInfo', ['userInfo']),
      joinedTitle() {
        return this.title.split(" ").join('-')
      }
    },
    created() {
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
              break;

            }
            // case 'MainArticles':
            //   break;
            default:
              break;
          }
        }
    },
}
</script>
