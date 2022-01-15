<template>
  <div>
      <h1>this is the id user page</h1>
      <h2>{{ params }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            params: this.$route.params.id,
            userData: null
        }
    },
    computed: {
        ...mapGetters('userInfo', ['userInfo'])
    },
    created() {
        this.userData = this.userInfo
    }

}
</script>

<style>

</style>
