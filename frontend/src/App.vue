<template>
  <v-app>
    <v-app-bar
      app
      color="primary">
      <router-view name="header"></router-view>
      <!-- <tabs></tabs> -->
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <!-- <list></list> -->
    </v-main>
  </v-app>
</template>

<script>
import * as a from './store/action_types';

export default {
    name: 'App',
    components: {
    },
    data: () => ({
    //
    }),
    mounted: function () {
        this.$store.dispatch(a.FETCH_ARTICLES);
    }
};
</script>
