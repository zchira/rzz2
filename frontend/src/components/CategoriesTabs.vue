<template>
    <v-card class="pa-0">
        <v-tabs
            show-arrows
            color="white"
            background-color="primary"
            class="pa-0 ma-0"
            @change="onChanged"

          >
            <v-tab
                v-for="i in categories"
                :key="i"
              >
                {{ i }}
            </v-tab>
        </v-tabs>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import * as m from '@/store/mutation_types';

export default {
    name: 'CategoriesTabs',
    props: {
    },
    computed: {
        ...mapGetters(['categories', 'activeCategory'])
    },
    methods: {
        onChanged: function (item) {
            console.log(item);
            this.$store.commit(m.SET_ACTIVE_CATEGORY, this.categories[item]);
        }
    }
};
</script>
