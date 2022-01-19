<template>
  <div>
      <h1>SEARCH</h1>
      <p> Your current Favorite Tags:</p>
      <p v-for="(tag, index) in userInfo.favorited"
            :key=index >{{ tag }}
            <button @click="removeUserFavorite(tag)">X</button></p>
      <p v-if="errorMessage">{{ errorMessage }}</p>

      <p>Your Most Recent Searches:</p>
      <ul>
          <li @click="previousSearch(prevSearch)" v-for="prevSearch in userInfo.recent_searches" :key="prevSearch">{{prevSearch}}</li>
      </ul>
    <form @submit.prevent="searchNews">
        <input type="text" v-model="searchString" placeholder="SEARCH">
        <input type="submit" value="Search">
    </form>
    <button :disabled="errorMessage" @click="saveUserFavorite">Save Search to Favorites</button>


    <Article v-for="article in searchResults" :key=article.id :singlearticle="article" :location="'Search'"/>
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
            searchResults: [],
            errorMessage: null
        }
    },
    computed: {
        ...mapGetters('userInfo', ['userInfo'])
    },
    methods: {
        ...mapActions('userInfo', ['updateUserSearches', 'updateUserFavorites', 'removeUserFavorite']),
        ...mapActions('devMessage', ['fetchMessage']),
        session() {
            return this.userInfo.session
        },
        async searchNews() {
            try {
                const res = await axios.get(`http://localhost:8000/api/search/?tags=${this.searchString}`);
                this.searchResults = res.data.articles
                if (this.session()) {
                    this.updateUserSearches(this.searchString)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async previousSearch(string){
            if (this.session()) {
                try {
                    this.searchString = string;
                    const res = await axios.get(`http://localhost:8000/api/search/?tags=${string}`);
                    // const res = await axios.get(`http://localhost:8000/api/search/`);
                    this.searchResults = res.data.articles

                } catch (err) {
                    console.log(err);
                }
            }
        },
        async saveUserFavorite() {
            if (this.session()) {
                if (this.userInfo.favorited?.length < 3) {
                this.updateUserFavorites(this.searchString);
                } else {
                    this.errorMessage = "You can only have 3 favorites at a time."
                }
            }

        },
        async deleteUserFavorite(favorite) {
            this.removeUserFavorite(favorite);
        }
    },
    created() {

    }
}
</script>

<style>

</style>
