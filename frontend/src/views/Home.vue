<template>
  <div>
    <tabs storeGetter='sources' toStrProp='name'></tabs>
    <list></list>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapGetters } from 'vuex';
import Tabs from '@/components/Tabs.vue';
import List from '@/components/List.vue';

export default {
    name: 'Home',
    components: {
        Tabs,
        List
    },
    computed: {
        ...mapGetters(['sources'])
    },
    methods: {
    }
};
</script>
