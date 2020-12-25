<template>
    <!-- <v&#45;card class="pa&#45;0"> -->
        <v-row>
            <v-col>
                <v-text-field
                    class="pt-6"
                    ahint="www.example.com/page"
                    dense
                    outlined
                    color="white"
                    v-model="url"
                    label="http://some web address"></v-text-field>
            </v-col>
            <v-col>
                <v-btn
                    class="mt-7"
                    depressed
                    @click="onClick">
                    Find feeds
                </v-btn>
            </v-col>
        </v-row>

  <!-- </v&#45;card> -->
</template>

<script>
export default {
    name: 'SearchFeedsText',
    data: function () {
        return {
            url: undefined
        };
    },
    methods: {
        onClick: function () {
            console.log('onslick SearchFeedsText');
            this.$emit('onSearchFeeds', this.url);
        }
    }
};
</script>
