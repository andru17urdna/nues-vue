<template>
  <div>
    <DevInfoDisplay :user="userInfo"
                    :iterator="iterator"
                    v-on:next-iter="iterator++"
                    v-on:prev-iter="iterator--"
                    />
    <Modal v-if="displayModal"
               v-on:remove-modal="closeModal" />
    <AppHeader v-on:user-login="signIn"
               v-on:user-logout="logout"
               v-on:show-settings="showModal"/>
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data(){
    return {
      displayModal: false,
      iterator: 0,
    }
  },
  computed: {
    ...mapGetters('userInfo', ['userInfo']),
  },
  created(){

  },
  watch: {
    $route (to, from) {
      this.iterator = 0;
    }
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
    },
    showModal() {
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    }
  }
}
</script>

<style>

</style>
