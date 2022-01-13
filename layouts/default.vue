<template>
  <div>
    <p>current User: {{ currentUser.username }}</p>
    <p>recent searches: {{ currentUser.recentSearches }}</p>
    <p>current favorites: {{ currentUser.favorites }}</p>
    <AppHeader v-on:sign-up="signUp"
               v-on:user-login="signIn"
               v-on:user-logout="logout"/>
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data(){
    return {
      currentUser: {
            username: null,
            recentSearches: null,
            favorites: null
          }
    }
  },
  computed: {
    ...mapGetters('userInfo', ['userInfo'])
  },
  created(){

  },
  methods: {
    ...mapActions('userInfo', ['setUserInfo', 'removeUserInfo']),


    signUp(username) {
      this.currentUser.username = username
      if (process.client){
        const userInfo = JSON.stringify(this.currentUser);
        localStorage.setItem("USER_INFO", userInfo);
        this.setUserInfo(this.currentUser);
      }
    },
    signIn() {
      if (process.client){
          if (localStorage.getItem("USER_INFO")) {
              this.currentUser = JSON.parse(localStorage.getItem("USER_INFO"));
              this.setUserInfo(this.currentUser)
          } else {
            return;
          }
      }
    },
    logout(){
      this.removeUserInfo();
    }
  }
}
</script>

<style>

</style>
