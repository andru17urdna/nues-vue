<template>
    <v-list-item>
        <v-list-item-avatar>
        <v-img
            :alt="'Headline'"
            :src="article.urlToImage"
        ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
        <v-list-item-title v-text="article.title"></v-list-item-title>
        </v-list-item-content>


        <Btn-LoadDisableBtn
            v-on:click-stop="updateUserQueue(article)"
            :icon="'mdi-plus'"
        />


    </v-list-item>

</template>

<script>
import { mapActions } from 'vuex';


export default {
    name: "TopHeadlinesArticle",
    props: ["article"],
    async created() {

    },
    data: () => ({

    }),
    methods: {
        ...mapActions("userInfo", ["updateUserQueue"]),
    },
}
</script>

<style>

</style>
