<template>
  <div>
      <h1>SEARCH</h1>
      <p> When a user is logged in their most recent searches are saved for ease of use</p>
      <ul>
          <li @click="previousSearch(prevSearch)" v-for="prevSearch in userInfo.recent_searches" :key="prevSearch">{{prevSearch}}</li>
      </ul>
    <form @submit.prevent="searchNews">
        <input type="text" v-model="searchString" placeholder="SEARCH">
    </form>

    <Article v-for="article in searchResults" :key=article.title :source="article.source" :author="article.source"
             :content="article.content" :description="article.description" :publishedAt="article.publishedAt"
             :title="article.title" :url="article.url" :urlToImage="article.urlToImage" :location="'Search'"/>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from "vuex";

export default {
    name: 'Search',
    data() {
        return {
            searchString: '',
            searchResults: []
        }
    },
    computed: {
        ...mapGetters('userInfo', ['userInfo'])
    },
    methods: {
        ...mapActions('userInfo', ['updateUserSearches']),
        async searchNews() {
            try {
                const res = await axios.get(`http://localhost:8000/api/search/?tags=${this.searchString}`);
                this.searchResults = res.data.articles
                this.updateUserSearches(this.searchString)
            } catch (err) {
                console.log(err);
            }
        },
        async previousSearch(string){
            try {
                this.searchString = string
                const res = await axios.get(`http://localhost:8000/api/search/?tags=${string}`);
                this.searchResults = res.data.articles
            } catch (err) {
                console.log(err);
            }
        },
    },

    created() {

    }
}
</script>

<style>

</style>
