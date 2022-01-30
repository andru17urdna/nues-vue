<template>
  <v-container class="blue">
    <div class="">
          <h1>SEARCH</h1>
              <h3 v-if="userInfo.session"> Your current Favorite Tags:</h3>
          <div class="">
              <p class=""
                    @click.stop="previousSearch(tag)"
                     v-for="(tag, index) in userInfo.favorited"
                    :key=index >{{ tag }}
                    <button @click="deleteUserFavorite(tag)">X</button></p>
              <p class="" v-if="errorMessage">{{ errorMessage }}</p>
          </div>

          <h3 v-if="userInfo.session">Most Recent Searches:</h3>

              <div class="">
                  <p class="" @click="previousSearch(prevSearch)" v-for="prevSearch in userInfo.recent_searches" :key="prevSearch">{{prevSearch}}</p>
              </div>

        <form class="Search_Form-form" @submit.prevent="searchNews">
            <input class="Search_Form-input" type="text" v-model="searchString" placeholder="SEARCH">
            <input class="Search_Form-btn" type="submit" value="Search">
        </form>
        <button v-if="userInfo.session" :disabled="errorMessage" @click="saveUserFavorite">Save Search to Favorites</button>
    </div>

    <div class="Search_articleContainer-div">
        <Article v-for="article in searchResults" :key=article.id :singlearticle="article" :location="'Search'"/>
    </div>
  </v-container>
</template>

<script>
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
                const res = await this.$axios.get(`/api/search/?tags=${this.searchString}`);
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
                    const res = await this.$axios.get(`/api/search/?tags=${string}`);
                    // const res = await this.$axios.get(`/api/search/`);
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
            if (this.errorMessage) {
                this.errorMessage = null;
            }
        }
    },
    created() {

    }
}
</script>
