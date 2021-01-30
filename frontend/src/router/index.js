import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// import List from '../components/List.vue';
import Header from '../components/Header.vue';
import ExportSources from '../views/ExportSources.vue';
import SearchFeedsResults from '../views/SearchFeedsResults.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        components:
            {
                default: Home,
                header: Header
            }
    },
    {
        path: '/find-feeds',
        name: 'FindFeeds',
        components:
            {
                default: SearchFeedsResults
            }
    },
    {
        path: '/export',
        name: 'ExportSources',
        components:
        {
            default: ExportSources
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
