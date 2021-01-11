<template>
<v-card
    class="mx-auto"
    tile
  >
    <v-list dense>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in articles"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon
              :v-touch="onTouch"
              >mdi-square</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import * as a from '@/store/action_types';

export default {
    name: 'List',
    props: {
        tabs: []
    },
    computed: {
        ...mapGetters([
            'activeSource',
            'articles'
        ])
    },
    data: function () {
        return {
            selectedItem: 'Vest1'
        };
    },
    watch: {
        activeSource: function (newVal, oldVal) {
            console.log('watch');
            if (newVal === undefined) {
                return;
            }
            console.log(newVal);
            console.log('fetch articles');
            console.log(newVal.url);

            this.$store.dispatch(a.FETCH_ARTICLES, { url: newVal.url });
        }
    },
    methods: {
        onTouch: function () {
            alert('aaaaa');
        }
    }
};
</script>
