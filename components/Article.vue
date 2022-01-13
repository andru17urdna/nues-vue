<template>
<nuxt-link :to="'/'">
  <div class="Article_container-div">
      <img :src="urlToImage" alt="">
      <h2>{{title}}</h2>
      <p v-if="author.name !== null">Author: {{author.name}}</p>
      <p v-if="content !== null">Content: {{content}}</p>
      <p >Description: {{description}}</p>
      <p>PublishedAt: {{publishedAt}}</p>
      <p>Title: {{title}}</p>
      <a :href="url">Link to article</a>
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
        deleteable: false
      }
    },
    props: ['source', 'author', 'content', 'description', 'publishedAt', 'title', 'url', 'urlToImage', 'theArticle', 'location'],
    computed: {
      ...mapGetters('userInfo', ['userInfo'])
    },
    methods:{
        ...mapActions('articlesData',['fetchDefaultArticles', 'deleteArticle']),
    },
    created() {
      if (this.userInfo.session && this.location === 'MainArticles') {
        this.deleteable = true;
      }
    }
}
</script>

<style lang="scss" scoped>
.Article_container-div{
  padding: 1rem;
  border: 1px dotted #ccc;
  margin: 1rem 0;

  img{
    width: 90px;
  }
}
</style>
