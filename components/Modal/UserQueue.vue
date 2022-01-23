<template>
  <div @click.stop class="Modal_container-div">
    <h2>Your Queued Articles</h2>
    <div v-if="userQueue.length">
        <div v-for="article in userQueue" :key=article.id>
            <Article :singlearticle="article" :location="'Queue'" />
            <button @click="removeUserQueue(article.id)">Read</button>
        </div>

    </div>
    <div v-else>
        <p>Add Articles to your queue!!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name:'UserQueue',
  data() {
      return {

      }
  },
  computed: {
      ...mapGetters('userInfo', ['userQueue'])
  },
  methods:{
      ...mapActions('userInfo', ['removeUserQueue'])
  }


}
</script>

<style lang='scss' scoped>
    .Modal_container-div{
    height: 50rem;
    width: 60rem;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: scroll;
  }

</style>
