<template>
  <div>
    <h1>User Profile page</h1>
      <p>{{ currentUser }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
          currentUser: null
        }
    },
    computed: {
        ...mapGetters('userInfo', ['userInfo'])
    },
    created() {
      this.fetchUserInfo();
      console.log(this.userInfo)
      this.currentUser = {stuff: "things"};
      // console.log(this.userInfo)
    },
    methods: {
      ...mapActions('userInfo', ['fetchUserInfo'])
    }

}
