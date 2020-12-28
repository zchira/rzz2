<template>
    <v-card class="pa-0">
        <v-tabs
            show-arrows
            color="white"
            background-color="primary"
            class="pa-0 ma-0"
            v-model="selectedSource"
            :optional="optional"
          >
            <v-tab
                v-for="(item, i) in activeSources"
                :key="i"
              >
                {{ item.name }}
            </v-tab>
        </v-tabs>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import * as m from '@/store/mutation_types';

export default {
    name: 'SourcesTabs',
    props: {
    },
    computed: {
        ...mapGetters([
            'sources',
            'activeSource',
            'activeCategory',
            'categories'
        ]),
        optional: function () {
            if (this.activeSource.category === this.activeCategory) {
                return false;
            }
            return true;
        },
        selectedSource: {
            get: function () {
                const as = this.sources.find(x => x.id === this.activeSource.id);
                if (as === undefined) {
                    return undefined;
                }

                const i = this.activeSources.indexOf(as);
                return i;
            },
            set: function (newValue) {
                const src = this.activeSources[newValue];
                if (src === undefined) {
                    return;
                }
                this.$store.commit(m.SET_ACTIVE_SOURCE, src);
            }
        },
        activeSources: function () {
            if (this.activeCategory !== undefined &&
                this.activeSource !== undefined) {
                return this.sources.filter(s => s.category === this.activeCategory);
            }
            return [];
        }
    },
    methods: {
    }
};
</script>
