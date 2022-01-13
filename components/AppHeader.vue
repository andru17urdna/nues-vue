<template>
  <header class="header">
    <h1 class="title">Navigation</h1>

    <div v-if="username === null">
        <form @submit.prevent="signUp">
            <input type="text" v-model="username" placeholder="username">
            <input type="submit" value="Something">
        </form>
        <button @click="login">Login</button>
    </div>
    <div v-else>
        <button @click="logout">Logout</button>
    </div>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/search">Search</nuxt-link>

  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
      return {
          username: null,
      }
  },

  created() {

  },
  methods: {
      signUp(){
          this.$emit('sign-up', this.username);
          this.text = ""
      },
      login(){
          let username = "";
          if (process.client){
              if (localStorage.getItem("USER_INFO")) {
                  username = JSON.parse(localStorage.getItem("USER_INFO"));
                  this.username = username;
              }
          }
          this.$emit('user-login', username)
      },
      logout(){
          this.$emit('user-logout')
      }
  }
}
</script>

<style>

</style>
