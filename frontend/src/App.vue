<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <!-- <div class="d&#45;flex align&#45;center"> -->
      <!--   <v&#45;img -->
      <!--     alt="Vuetify Logo" -->
      <!--     class="shrink mr&#45;2" -->
      <!--     contain -->
      <!--     src="https://cdn.vuetifyjs.com/images/logos/vuetify&#45;logo&#45;dark.png" -->
      <!--     transition="scale&#45;transition" -->
      <!--     width="40" -->
      <!--   /> -->
      <!-- </div> -->

      <tabs></tabs>
      <!-- <v&#45;spacer></v&#45;spacer> -->
      <!--  -->
      <!-- <v&#45;btn -->
      <!--   href="https://github.com/vuetifyjs/vuetify/releases/latest" -->
      <!--   target="_blank" -->
      <!--   text -->
      <!-- > -->
      <!--   <span class="mr&#45;2">Latest Release</span> -->
      <!--   <v&#45;icon>mdi&#45;open&#45;in&#45;new</v&#45;icon> -->
      <!-- </v&#45;btn> -->
    </v-app-bar>

    <v-main>
      <list></list>
    </v-main>
  </v-app>
</template>

<script>
import Tabs from './components/Tabs';
import List from './components/List';

export default {
    name: 'App',
    components: {
        Tabs,
        List
    },
    data: () => ({
    //
    }),
    mounted: function () {
        this.$store.dispatch('fetchArticles');
    }
};
</script>
