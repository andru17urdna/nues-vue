<template>
    <nuxt-link v-if="url"
        class="WrapperNuxtLink_container-nuxtlink"
        :to="'article/' + url">
        <slot>Broken Article</slot>
    </nuxt-link>
</template>

<script>
export default {
    data() {
        return {
            data: null
        }
    },
    props: ['url'],
    created() {

    },
}
</script>

<style lang="scss" scoped>

</style>
