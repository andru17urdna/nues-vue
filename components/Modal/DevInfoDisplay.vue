<template>
  <div class="DevInfoDisplay_container-div">
    <h3>Dev info display</h3>
    <p>This modal is only temporary as way to show data changing in state on page as well as interaction on each page. But also for me to give you sarcastic remarks the entire time you are here!! :D</p>
    <p>{{currentUser}}</p>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "DevInfoDisplay",
  props: ['currentUser'],
  data() {

  },
  computed: {
    // ...mapGetters('userInfo', ['userInfo'])
  }
}
</script>

<style lang="scss" scoped>
.DevInfoDisplay_container-div{
    height: 8rem;
    width: 50rem;
    background: orange;
    position: fixed;
    /* top: 0;
    left: 50%; */
    margin: auto 50vw 0;
    transform: translatex(-50%);
}


</style>
