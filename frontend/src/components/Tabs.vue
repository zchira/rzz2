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
                v-for="i in items"
                :key="toStr(i)"
              >
                {{ toStr(i) }}
            </v-tab>
        </v-tabs>
    </v-card>
</template>

<script>
export default {
    name: 'Tabs',
    props: {
        storeGetter: undefined,
        toStrProp: undefined
    },
    computed: {
        items: function () {
            console.log('----');
            console.log(this.storeGetter);
            const toRet = this.$store.getters[this.storeGetter];
            if (toRet === undefined) {
                return [];
            }
            return toRet;
        }
    },
    methods: {
        toStr: function (item) {
            if (this.toStrProp === undefined) {
                return item;
            }
            return item[this.toStrProp];
        }
    }
};
</script>
