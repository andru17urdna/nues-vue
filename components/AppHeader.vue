<template>
  <header class="header">
    <h1 class="title">Navigation</h1>
// TODO: Move user buttons back to v-else
    <div v-if="!userLoggedIn">
        <button @click="login">Demo User Login</button>
    </div>
    <div v-else>
        <button @click="showSettingsModal">Settings</button>
        <button @click="logout">Logout</button>
    </div>
        <button @click="showUserQueueModal">Your Queue</button>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/search">Search</nuxt-link>
  </header>
</template>

<script>

export default {
  name: 'AppHeader',
  data() {
      return {
          userLoggedIn: false,
      }
  },
  created() {

  },
  methods: {
      login(){
          this.$emit('user-login')
          this.userLoggedIn = true;
      },
      logout(){
          this.$emit('user-logout');
          this.userLoggedIn = false;
      },
      showSettingsModal(){
          this.$emit('show-settings');
      },
      showUserQueueModal(){
          this.$emit('show-queue');
      }
  }
}
</script>

<style>

</style>
