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

  },
  methods: {
    closeModal() {
      this.$emit('remove-modal')
    },
  }
}
</script>

<style lang="scss" scoped>


</style>
