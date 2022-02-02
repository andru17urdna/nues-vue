
<template>
  <v-app id="inspire">

  <!--   -->

    <v-app-bar
      app
      dark
      height="120"
      color="#d2691e"
      src="https://picsum.photos/1920/1080?random"
    >
      <template >


        <v-spacer></v-spacer>

          <h1>NUES VUE</h1>

      </template>
        <v-spacer></v-spacer>

      <div>
        <div>
          <v-btn icon
          @click="signIn"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn icon
          :to="'/'"
          >
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn icon
          :to="'/search'"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon
          :to="'/about'"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon
            @click="displayModal = true"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>

        <p class="pt-3 d-flex flex-row-reverse">{{userInfo.username}}</p>
      </div>

      <!-- <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Favorited</v-tab>
          <v-tab>Fox</v-tab>
          <v-tab>CBS</v-tab>
        </v-tabs>
      </template> -->
    </v-app-bar>

    <v-main class="green">
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
    data: () => ({
        // Vuetify
        drawer: null,
        items: [
            { title: "Home", icon: "mdi-home", to: "/" },
            { title: "Search", icon: "mdi-magnify", to: "/search" },
            { title: "About", icon: "mdi-magnify", to: "/about" },
        ],
        // Other
        displayModal: false,
        modalType: "user-Settings",
    }),
    computed: {
        ...mapGetters("userInfo", ["userInfo"]),
    },
    created() {
    },
    watch: {
        $route(to, from) {
            this.iterator = 0;
        }
    },
    methods: {
        ...mapActions("userInfo", ["fetchUserInfo", "removeUserInfo"]),
        ...mapActions("articlesData", ["fetchDefaultArticles", "fetchUserArticles"]),
        async signIn() {
            await this.fetchUserInfo();
            this.fetchUserArticles(this.userInfo.favorited);
        },
        logout() {
            this.removeUserInfo();
            this.fetchDefaultArticles();
        },
        showSettingsModal() {
            this.modalType = "user-Settings";
            this.displayModal = true;
        },
        closeModal() {
            this.displayModal = false;
        },
        showQueueModal() {
            this.modalType = "user-Queue";
            this.displayModal = true;
        }
    },
}
</script>
