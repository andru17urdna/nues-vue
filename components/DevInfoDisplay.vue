<template>
  <div class="DevInfoDisplay_container-div">
    <h3>Dev info display</h3>
    <p>{{ currentUser }}</p>
    <p>{{ getMessage }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DevInfoDisplay",
  props: ['currentUser'],
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('devMessage', ['getMessage'])
  },
  created() {
    this.fetchMessage('homePage');
    console.log(this.currentUser)
  },
  methods: {
    ...mapActions('devMessage', ['fetchMessage'])
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
