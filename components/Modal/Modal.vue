<template>

  <div class="Modal_background-div" @click="closeModal">

    <div @click.stop class="Modal_container-div">
      <h3>Home Page Settings</h3>
      <p>{{ userSettings.columns }}</p>
      <p>{{ userSettings.mode }}</p>
      <p>Prev Settings: {{ prevSettings }}</p>
      <p>Columns:{{columns}}</p>
      <p>Mode:{{mode}}</p>
      <p>modal</p>
      <button @click="acceptChanges">Accept</button>
      <button @click="cancelChanges">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Modal",
  data() {
    return {
      prevSettings: null,
      columns: null,
      mode: null
    }
  },
  computed:{
    ...mapGetters('userInfo', ['userSettings'])
  },
  created() {
    this.prevSettings = this.userSettings;
    this.columns = this.userSettings.columns;
    // this.columns = 4;
    this.mode = this.userSettings.mode;
  },
  methods: {
    ...mapActions('userInfo', ['updateUserSettings']),
    closeModal() {
      this.$emit('remove-modal')
    },
    cancelChanges() {
      console.log(this.prevSettings)
      this.updateUserSettings(this.prevSettings);
    },
    acceptChanges() {
      const data = {
        columns: this.columns,
        mode: this.mode
      }
      this.updateUserSettings(data)
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
