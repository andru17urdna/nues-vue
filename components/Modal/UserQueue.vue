<template>
  <div @click.stop class="Modal_container-div">
    <div class="UserQueue_h2container-div">
      <h2>Your Queued Articles</h2>
    </div>
    <div v-if="userQueue.length">
        <div class="UserQueue_articleContainer-div" v-for="article in userQueue" :key=article.id>
            <Article :singlearticle="article" :location="'Queue'" />
            <button @click="removeUserQueue(article.id)">Read</button>
        </div>

    </div>
    <div v-else>
        <p class="UserQueue_addArticleMsg-p">Add Articles to your queue to see them appear here.</p>
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
      ...mapActions('userInfo', ['removeUserQueue']),

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
    overflow-y: auto;
    border: black solid 3px;

    .UserQueue_addArticleMsg-p{
      text-align: center;
      font-size: 30px;
    }

    .UserQueue_articleContainer-div{
      padding: 10px;
    }

    .UserQueue_h2container-div{
      height: 3rem;
      border-bottom: solid black 3px;
      text-align: center;
    }
  }

</style>
