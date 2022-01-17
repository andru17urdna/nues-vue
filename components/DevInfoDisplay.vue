<template>
  <div
    class="DevInfoDisplay_container-div">
    <div v-if="!isHidden">
      <h3>Dev info display</h3>
      <p>Username: {{ user.username }} - Favorited: {{ user.favorited }} - Recent Searches: {{ user.recent_searches}}</p>
      <p>{{ getMessage[iterator] }}</p>
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
  props: ['user', 'iterator'],
  data() {
    return {
      showPrev: false,
      showNext: true,
      isHidden: false
    }
  },
  computed: {
    ...mapGetters('devMessage', ['getMessage'])
  },

  created() {
    this.fetchMessage('homePage');
    this.buttonSwitch();
  },
  watch: {

  },
  methods: {
    ...mapActions('devMessage', ['fetchMessage']),
    nextIteration() {
      this.$emit('next-iter')
      this.buttonSwitch()
    },
    prevIteration() {
      this.$emit('prev-iter')
      this.buttonSwitch()
    },
    buttonSwitch() {
      if (this.getMessage.length === 1) {
        this.showPrev = false;
        this.showNext = false;
      }
      if (this.iterator <= 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      if (this.iterator >= this.getMessage.length -1) {
        this.showNext = false;
      } else {
        this.showNext = true;
      }
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
