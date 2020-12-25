<template>
  <div>
    <v-app>
      <v-app-bar
        app
        color="primary">
        <tabs></tabs>
      </v-app-bar>

      <v-main>
        <list></list>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Tabs from '../components/Tabs';
import List from '../components/List';

export default {
    name: 'App',
    components: {
        Tabs,
        List
    },
    data: () => ({
    }),
    mounted: function () {
        this.$store.dispatch('fetchArticles');
    }
};
</script>
