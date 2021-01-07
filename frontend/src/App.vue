<template>
  <v-app>
    <v-app-bar
      class="pt-6"
      style="height: 112px;"
      app
      color="primary">
      <v-app-bar-nav-icon @click.stop="showNav = !showNav"></v-app-bar-nav-icon>
      <router-view
        name="header"></router-view>
    </v-app-bar>
    <v-navigation-drawer
      v-model="showNav"
      app>
      <v-list dense nav>
        <v-list-item-group>
          <v-list-item :to="'/'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/find-feeds'">
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Find Feeds</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item :ripple="false">
            <v-list-item-icon>
              <v-switch
                label="Dark Mode"
                dense
                @change="$vuetify.theme.dark = !$vuetify.theme.dark"
                ></v-switch>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main style="padding-top: 112px">
        <router-view></router-view>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

export default {
    name: 'App',
    components: {
    },
    data: () => ({
        showNav: false
    }),
    mounted: function () {
    }
};
</script>
