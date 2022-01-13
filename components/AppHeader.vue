<template>
  <header class="header">
    <h1 class="title">Navigation</h1>

    <div v-if="username === null">
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
      login(){
          this.$emit('user-login')
      },
      logout(){
          this.$emit('user-logout')
      }
  }
}
</script>

<style>

</style>
