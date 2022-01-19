<template>
    <nuxt-link v-if="this.singlearticle"
        :to="'article/' + this.singlearticle.id">

    </nuxt-link>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['singlearticle', 'things'],
    created() {
        console.log(this?.things, "FROM WRAPPER")
    }
}
</script>

<style>

</style>
