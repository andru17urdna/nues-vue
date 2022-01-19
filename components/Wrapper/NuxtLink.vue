<template>
    <nuxt-link v-if="url"
        class="WrapperNuxtLink_container-nuxtlink"
        :to="'article/' + this.url">
        <slot>Broken Article</slot>
    </nuxt-link>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['url'],
    created() {

    },
}
</script>

<style lang="scss" scoped>
    .WrapperNuxtLink_container-nuxtlink{
            text-decoration: none;
    }
</style>
