<template>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name:'UserSettings',
  data() {
    return {
      interacted: false,
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
    this.mode = this.userSettings.mode;
  },
  destroyed() {
    if (!this.interacted) {
      this.updateUserSettings(this.prevSettings);
    }
  },
  methods: {
    ...mapActions('userInfo', ['updateUserSettings']),
    cancelChanges() {
      this.$emit('remove-modal')
    },
    acceptChanges(boolean) {
      const data = {
        columns: this.columns,
        mode: this.mode
      }

      this.updateUserSettings(data)
      if (boolean) {
        this.interacted = true;
        this.$emit('remove-modal')
      }
    },
  }
}
</script>

<style lang='scss' scoped>
    .Modal_container-div{
    height: 20rem;
    width: 20rem;
    background: orange;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
