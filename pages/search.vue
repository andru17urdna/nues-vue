<template>
  <div>
      <h1>SEARCH</h1>
      <p>{{ searchString }}</p>
    <form @submit.prevent="searchNews">
        <input type="text" v-model="searchString" placeholder="SEARCH">
    </form>

    <Article v-for="article in searchResults" :key=article.title :source="article.source" :author="article.source"
             :content="article.content" :description="article.description" :publishedAt="article.publishedAt"
             :title="article.title" :url="article.url" :urlToImage="article.urlToImage"/>
    <ul>
        <li v-for="article in allArticles" :key="article.title">
            {{ article }}
        <p @click="deleteArticle(article.title)">Delete</p>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: 'Search',
    computed: {
        ...mapGetters('articlesData',['allArticles']),

    },
    data() {
        return {
            searchString: '',
            searchResults: []
        }
    },
    methods: {
        ...mapActions('articlesData',['fetchArticles', 'deleteArticle']),
        async searchNews() {
            console.log(this.searchString)

            const config = {
            headers: {
                'Accept': 'applications/json'
            }
        }

        try {
            const res = await axios.get(`http://localhost:8000/api/search/?tags=${this.searchString}`, config);
            // console.log(res.data)
            this.searchResults = res.data.articles
            console.log(this.searchResults);
        } catch (err) {
            console.log(err);
        }
        },
    },
    created() {
        this.fetchArticles();
    }
}
</script>

<style>

</style>
