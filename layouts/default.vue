
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{userInfo.username}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#d2691e"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Nues-Vue</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon
        @click="displayModal = true"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Favorited</v-tab>
          <v-tab>Fox</v-tab>
          <v-tab>CBS</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <!-- <DevInfoDisplay :user="userInfo" /> -->
    <Modal v-if="displayModal"
           :type="modalType"
           v-on:remove-modal="closeModal" />
    <!-- <AppHeader v-on:user-login="signIn"
               v-on:user-logout="logout"
               v-on:show-settings="showSettingsModal"
               v-on:show-queue="showQueueModal"/> -->
    <Nuxt />
    </v-main>
  </v-app>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data:() =>(
    {
  // Vuetify
      drawer: null,
      items: [
          { title: 'Home', icon: 'mdi-home', to: '/' },
          { title: 'Search', icon: 'mdi-magnify', to: '/search' },
          { title: 'About', icon: 'mdi-magnify', to: '/about' },
      ],
  // Other
      displayModal: false,
      modalType: 'user-Settings',

    }
  ),
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
