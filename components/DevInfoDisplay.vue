<template>
  <div
    class="DevInfoDisplay_container-div">
    <div v-if="!isHidden">
      <h3>Dev info display</h3>
      <p>Queue {{ user.queueData }} - Favorited: {{ user.favorited }} - Recent Searches: {{ user.recent_searches}}</p>
      <!-- <p>{{ getMessage[iterator] }}</p> -->
      <button v-if="showPrev" @click="prevIteration">Previous</button>
      <button v-if="showNext" @click="nextIteration">Next</button>
    </div>
    <button class="hide-button" @click="isHidden = !isHidden">Hide Dev</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DevInfoDisplay",
  props: ['user'],
  data() {
    return {
      showPrev: false,
      showNext: true,
      isHidden: false,
      iterator: 0,
    }
  },
  computed: {
    ...mapGetters('devMessage', ['getMessage'])
  },
  created() {
    this.buttonSwitch();
  },
  watch: {
    $route (to, from) {
      this.fetchMessage(to.name);
      this.iterator = 0;
      this.buttonSwitch();
    }
  },
  methods: {
    ...mapActions('devMessage', ['fetchMessage']),
    nextIteration() {
      this.iterator++;
      this.buttonSwitch();
    },
    prevIteration() {
      this.iterator--;
      this.buttonSwitch();
    },
    buttonSwitch() {
      if (this.getMessage.length <= 1) {
        this.showPrev = false;
        this.showNext = false;
      }
      this.iterator <= 0 ? this.showPrev = false : this.showPrev = true;
      this.iterator >= this.getMessage.length -1 ? this.showNext = false : this.showNext = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.DevInfoDisplay_container-div{
    width: 50rem;
    background: rgba(128, 128, 128);
    position: fixed;
    margin: auto 50vw 0;
    transform: translatex(-50%);
    color: white;
}

</style>
