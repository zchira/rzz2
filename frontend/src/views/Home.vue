<template>
  <div>
    <sources-tabs></sources-tabs>
    <list></list>
  </div>
</template>

<script>
import SourcesTabs from '@/components/SourcesTabs.vue';
import List from '@/components/List.vue';

export default {
    name: 'Home',
    components: {
        SourcesTabs,
        List
    },
    computed: {

    },
    methods: {
    }
};
</script>
