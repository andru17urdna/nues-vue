<template>

  <div class="Modal_background-div" @click="[closeModal(), cancelChanges()]">

    <div @click.stop class="Modal_container-div">
      <h3>Home Page Settings</h3>
      <p>Number of Columns:</p>
      <select @change="acceptChanges(false)" v-model="columns">
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <p>Light Mode or Dark Mode:</p>
      <select @change="acceptChanges(false)" v-model="mode">
        <option :value="'light'">Light</option>
        <!-- <option>Dark</option> -->
      </select>
      <button @click="acceptChanges(true)">Accept</button>
      <button @click="cancelChanges(true)">Cancel</button>
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
      this.updateUserSettings(this.prevSettings);
      this.closeModal()
    },
    acceptChanges(boolean) {
      const data = {
        columns: this.columns,
        mode: this.mode
      }
      this.updateUserSettings(data)
      if (boolean) this.closeModal();
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
