<!-- Please remove this file from your project -->
<template>
  <div>
    <h1>STUFF</h1>
    <Article v-for="article in articles" :key=article.title :source="article.source" :author="article.source"
             :content="article.content" :description="article.description" :publishedAt="article.publishedAt"
             :title="article.title" :url="article.url" :urlToImage="article.urlToImage"/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NuxtTutorial',
  data() {
    return {
      articles: [],
    }
  },
  async created() {
    const config = {
      headers: {
        'Accept': 'applications/json'
      }
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/news`, config);
      this.articles = res.data.articles
      // console.log(res.data.articles)

    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style>

</style>
