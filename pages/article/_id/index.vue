<template>
  <div class="_id-Article_conatiner-div" v-if="this.article">
      <h2>{{article.title}}</h2>
      <img :src="article.urlToImage" alt="">
      <p>Author: {{article.author}}</p>
      <p>Content: {{article.content}}</p>
      <p>Description: {{article.description}}</p>
      <p>PublishedAt: {{article.publishedAt}}</p>
      <a :href="article.url">Link to article</a>
      <p>Source: {{article.source.name}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      article: null
    }
  },
  computed: {
    ...mapGetters('articlesData', ['singleArticle']),
  },
  created() {
    this.article = this.singleArticle(this.$route.params.id);
  }
}
</script>

<style lang='scss' scoped>

$width-calc: calc(150px + 100vw - 1000px);

._id-Article_conatiner-div{
    padding: 1rem;
    border: 3px solid black;
    margin: 1rem 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2,p{
      text-align: center;
      width: calc(150px + 100vw - 1000px);
    }

    img{
      width: $width-calc;
    }
}


</style>
