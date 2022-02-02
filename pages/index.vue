<template>

  <v-container class="blue-grey darken-1">

    <v-row>

        <v-col cols="12"
                md="9">

          <MainArticlesCopy class="amber darken-1" />
        </v-col>

        <v-col
         cols="12"
                md="3">
          <TopHeadlinesCopy  />
        </v-col>

    </v-row>
  </v-container>

</template>


<script>

export default {
    name: "IndexPage",
    data() {
        return {

        };
    },
    methods: {

    },
}
</script>
