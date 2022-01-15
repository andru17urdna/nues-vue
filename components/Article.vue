<template>
<nuxt-link class="Article_container-nuxtlink" :to="'article/' +  joinedTitle">
  <div :class="[fromMain ? 'Main--Article_container-div' : 'Article_container-div']">
      <img :src="urlToImage" alt="">
      <h2>{{title}}</h2>
      <p v-if="author.name !== null && location !== 'MainArticles'">Author: {{author.name}}</p>
      <p v-if="content !== null && location !== 'MainArticles'">Content: {{content}}</p>
      <p>Description: {{description}}</p>
      <p v-if="location !== 'MainArticles'">PublishedAt: {{publishedAt}}</p>
      <a v-if="location !== 'MainArticles'" :href="url">Link to article</a>
      <p>Source: {{source.name}}</p>
      <button v-if="this.deleteable" @click="deleteArticle(title)">Delete</button>
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
      }
    },
    props: ['source', 'author', 'content', 'description', 'publishedAt', 'title', 'url', 'urlToImage', 'theArticle', 'location'],
    computed: {
      ...mapGetters('userInfo', ['userInfo']),
      joinedTitle() {
        return this.title.split(" ").join('-')
      }
    },
    methods:{
        ...mapActions('articlesData',['fetchDefaultArticles', 'deleteArticle']),
    },
    created() {
      if (this.location === 'MainArticles') this.fromMain = true;
      if (this.userInfo.session && this.location === 'MainArticles') {
        this.deleteable = true;
      }
      console.log(this.fromMain)
    }
}
</script>
