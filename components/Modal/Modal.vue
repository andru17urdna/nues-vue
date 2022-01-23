<template>

  <div class="Modal_background-div" @click="closeModal">

    <ModalUserSettings
     v-if="type === 'user-Settings'"
     v-on="$listeners" />
    <ModalUserQueue v-else />

  </div>
</template>

<script>

export default {
  name: "Modal",
  props: ['type'],
  data() {
    return {

    }
  },
  computed:{

  },
  created() {
    console.log(this.type)

  },
  methods: {
    closeModal() {
      this.$emit('remove-modal')
    },
  }
}
</script>

<style lang="scss" scoped>
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
