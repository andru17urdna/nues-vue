<template>
  <form @submit.prevent="createUser">
    <input type="text" v-model="username" placeholder="username">
  </form>
</template>

<script>
export default {
  name: "SignUp",
  props: [],
  data() {
    return {
      username: ''
    }
  },
  methods: {
    createUser() {
      this.$emit('sign-up', this.username);
      this.username = "";
    }
  }
}
</script>

<style>

</style>
