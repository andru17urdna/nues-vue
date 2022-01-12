<template>
  <div class="Article_container-div">
      <img :src="urlToImage" alt="">
      <h2>{{title}}</h2>
      <p>Author: {{author.name}}</p>
      <p v-if="content !== null">Content: {{content}}</p>
      <p >Description: {{description}}</p>
      <p>PublishedAt: {{publishedAt}}</p>
      <p>Title: {{title}}</p>
      <a :href="url">Link to article</a>
      <p>Source: {{source.name}}</p>
  </div>
</template>

<script>
export default {
    name: 'Article',
    props: ['source', 'author', 'content', 'description', 'publishedAt', 'title', 'url', 'urlToImage', 'theArticle'],
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
