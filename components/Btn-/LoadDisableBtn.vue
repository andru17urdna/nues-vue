<template>
    <v-btn
        :loading="btnloading"
        :disabled="btndisabled"
        :icon="icon ? true: false"
        :text="textT ? true: false"
        @click.stop="loaderAndDisable()"
        color="orange"
        >
        <v-icon v-if="icon" v-text="icon"
        ></v-icon>
        <p v-else>{{ btndisabled ? 'In Queue':'Add to Queue'}}</p>
    </v-btn>


</template>




<script>
export default {
    name: 'LoadDisableBtn',
    props: ['textT', 'textF', 'icon'],
    data: () => ({
        btndisabled: false,
        btnloading: false,
    }),
    created(){

    },
    methods:{
        loaderAndDisable() {
            this.btnloading = true;

          setTimeout(() => {
            this.btnloading = false;
            this.$emit('click-stop')
            return;
          }, 800)
          this.btndisabled = true;
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
