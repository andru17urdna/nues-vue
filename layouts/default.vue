<template>
  <div>
    <DevInfoDisplay :user="userInfo" />
    <Modal v-if="displayModal"
           :type="modalType"
               v-on:remove-modal="closeModal" />
    <AppHeader v-on:user-login="signIn"
               v-on:user-logout="logout"
               v-on:show-settings="showSettingsModal"
               v-on:show-queue="showQueueModal"/>
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data(){
    return {
      displayModal: false,
      modalType: 'user-Settings'
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
    showSettingsModal() {
      this.modalType= 'user-Settings';
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },
    showQueueModal() {
      this.modalType = 'user-Queue';
      this.displayModal = true;
    }
  }
}
</script>

<style>

</style>
