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
    signIn() {
      this.fetchUserInfo();
    },
    logout(){
      this.removeUserInfo();
    }
  }
}
</script>

<style>

</style>
