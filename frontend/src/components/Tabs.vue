<template>
  <v-card class="pa-0">
    <v-tabs
      show-arrows
      color="white"
      background-color="primary"
      class="pa-0 ma-0"

      >
      <!-- show&#45;arrows> -->
      <!-- <v&#45;tabs&#45;slider></v&#45;tabs&#45;slider> -->

      <v-tab
        v-for="i in 30"
        :key="i"
        :href="'#tab-' + i">
        Item {{ i }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
    name: 'Tabs',
    props: {
    }
};
</script>
