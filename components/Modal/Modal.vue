<template>

  <div class="Modal_background-div" @click="closeModal">

    <div @click.stop class="Modal_container-div">
      <h3>Home Page Settings</h3>
      <p>{{ userSettings.columns }}</p>
      <p>{{ userSettings.mode }}</p>
      <p>Prev Settings: {{ prevSettings }}</p>
      <p>modal</p>
      <button>Accept</button>
      <button>Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Modal",
  data() {
    return {
      prevSettings: null
    }
  },
  computed:{
    ...mapGetters('userInfo', ['userSettings'])
  },
  created() {
    this.prevSettings = this.userSettings
  },
  methods: {
    closeModal() {
      this.$emit('remove-modal')
    },
    cancelChanges() {

    },
    acceptChanges() {

    },
  }
}
</script>

<style lang="scss">
  .Modal_background-div{
    background:rgba(128, 128, 128, .2);
    position: fixed;
    height: 100%;
    width: 100%;
    top:0px;

  }

  .Modal_container-div{
    height: 20rem;
    width: 20rem;
    background: orange;
    position: absolute;
    bottom: 0;
    right: 0;
  }

</style>
