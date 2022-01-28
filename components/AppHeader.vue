<template>
  <header class="AppHeader_container-header">
    <nuxt-link class="AppHeader_nuxtlink-home no-decoration hover" to="/">Home</nuxt-link>
    <nuxt-link class="AppHeader_nuxtlink-search no-decoration hover" to="/search">Search</nuxt-link>
    <div class="AppHeader_log-button" v-if="userInfo.session">
        <p @mouseover="showUserButtons = true"
           @mouseleave="showUserButtons = false"
        >{{ userInfo.username }}</p>
        <ul>
            <button @click="showSettingsModal">Settings</button>
            <button @click="showUserQueueModal">Your Queue</button>
            <button @click="logout">Logout</button>
        </ul>
    </div>
    <div class="AppHeader_log-button" v-else>
        <button @click="login">Demo User Login</button>
    </div>
    <h1>Nues-Vue</h1>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'AppHeader',
  data() {
      return {
          userLoggedIn: false,
      }
  },
  computed: {
        ...mapGetters('userInfo', ['userInfo'])
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

<style lang='scss' scoped>

    .AppHeader_container-header{
        background: #d2691e;
        height: 7rem;
        padding: 15px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(4, 1fr);
        border-bottom: black solid 3px;

        .no-decoration{
            text-decoration: none;
        }

        .hover:hover{
            color: rgb(255, 255, 255);
        }

        h1{

            grid-column: 3;
            grid-row: 1 / -1;
            justify-self: center;
            align-self: center;
            font-size: 50px;
            white-space: nowrap;
        }

        button{
            background: rgb(238, 238, 238);
            font-family: 'Epilogue';
            font-weight: bold;
            border: solid black 2px;
            white-space: nowrap;
            padding: 3px;


        }

        button:hover{
            background: white;
        }
        button:active{
            background: gray;
            transform: translate(0, 3px) ;
        }

        p{
            text-align: center;
            font-family: 'Epilogue';
            font-weight: bold;
        }

        a{
            font-family: 'Epilogue';
            font-weight: bold;
        }

        .AppHeader_nuxtlink-home{
            grid-row: 1;
            color: black;
        }
        .AppHeader_nuxtlink-search{
            grid-row: 2;
            color: black;
        }

        .AppHeader_log-button{
            grid-column: 5;
            grid-row: 1 / -1;
            justify-self: center;

        }
    }

</style>
