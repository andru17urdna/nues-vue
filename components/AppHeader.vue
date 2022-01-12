<template>
  <header class="header">
    <h1 class="title">Navigation</h1>
        <button @click="signIn()">Sign In</button>
        <button @click="signUp()">Sign Up</button>
        <nuxt-link to="/">Home</nuxt-link>
        <p>{{ username }}</p>
        <p v-if="recentSearches !== null">user Searches: {{ recentSearches }}</p>
        <p v-if="favorites !== null">user Info: {{ favorites }}</p>
    <SignUp v-on:sign-up="signUp" />
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
      return {
          username: null,
          recentSearches: null,
          favorites: null,
      }
  },

  created() {

  },
  methods: {
      signIn() {
          if (process.client){
              if (localStorage.getItem("USER_INFO")) {
                  this.username = JSON.parse(localStorage.getItem("USER_INFO"));
              }
          }

      },
      signUp(username) {
          console.log(this.showInput)
          this.username = username;
          if (process.client){
              const userInfo = JSON.stringify(this.username);
              localStorage.setItem("USER_INFO", userInfo)
          }
      },
  }
}
</script>

<style>

</style>
