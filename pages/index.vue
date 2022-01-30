<template>

  <v-container class="red">

    <v-row>

        <v-col cols="12"
                md="9">

          <MainArticlesCopy class="blue" />
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
