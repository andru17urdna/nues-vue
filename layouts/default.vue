<template>
  <div>
    <p>current User: {{ userInfo.username }}</p>
    <p>recent searches: {{ userInfo.recent_searches }}</p>
    <p>current favorites: {{ userInfo.favorited }}</p>
    <p>session: {{ userInfo.session }}</p>
    <AppHeader v-on:user-login="signIn"
               v-on:user-logout="logout"/>
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters('userInfo', ['userInfo'])
  },
  created(){

  },
  methods: {
    ...mapActions('userInfo', ['fetchUserInfo', 'removeUserInfo']),
    ...mapActions('articlesData',['fetchDefaultArticles','fetchUserArticles']),
    async signIn() {
      await this.fetchUserInfo();
      this.fetchUserArticles(this.userInfo.favorited);
    },
    logout(){
      this.removeUserInfo();
      this.fetchDefaultArticles();
    }
  }
}
</script>

<style>

</style>
