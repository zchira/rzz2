<template>
    <div>
    <categories-tabs></categories-tabs>
    <sources-tabs></sources-tabs>
    </div>
</template>

<script>
import CategoriesTabs from './CategoriesTabs.vue';
import SourcesTabs from './SourcesTabs.vue';

export default {
    name: 'Home',
    components: {
        CategoriesTabs,
        SourcesTabs
    },
    methods: {
    }
};
</script>
