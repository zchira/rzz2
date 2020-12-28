import Parser from 'rss-parser';
import * as m from '../mutation_types';
import * as a from '../action_types';
const parser = new Parser();

let CORS_PROXY = '/cors/';

if (process.env.NODE_ENV === 'development') {
    // CORS_PROXY = 'http://127.0.0.1:4040/cors/';
    CORS_PROXY = 'http://192.168.1.122:4040/cors/';
}

// initial state
const state = {
    categories: ['News', 'Sport'],
    sources: [
        {
            id: '1',
            name: 'Juzne Vesti',
            url: 'http://feeds.feedburner.com/juznevesti',
            category: 'News'
        },
        {
            id: '2',
            name: 'B92',
            url: 'http://feeds.feedburner.com/juznevesti',
            category: 'News'
        },
        {
            id: '3',
            name: 'N1',
            url: '',
            category: 'News'
        },
        {
            id: '4',
            name: 'Sport Klub',
            url: '',
            category: 'Sport'
        }
    ],
    activeCategory: 'News',
    activeSource: {
        id: '2',
        name: 'B92',
        url: '',
        category: 'News'
    },
    fetchingArticles: false,
    articles: []
};

const getters = {
    articles: state => state.articles,
    categories: state => state.categories,
    sources: state => state.sources,
    activeCategory: state => state.activeCategory,
    activeSource: state => state.activeSource
};

const mutations = {
    [m.FETCHING_ARTICLES] (state, fetching) {
        state.fetchingArticles = fetching;
    },
    [m.SET_ARTICLES] (state, { items }) {
        state.articles = items;
        state.fetchingArticles = false;
    },
    [m.FETCHING_ARTICLES_FAILED] (state) {
        state.articles = [];
        state.fetchArticles = false;
    },
    [m.SET_ACTIVE_CATEGORY] (state, category) {
        if (state.categories.indexOf(category) >= 0) {
            state.activeCategory = category;
        }
    },
    [m.SET_ACTIVE_SOURCE] (state, source) {
        console.log('SET_ACTIVE_SOURCE');
        console.log(source.name);
        const src = state.sources.find(f => f.id === source.id);
        if (src !== undefined) {
            console.log(src.name);
            state.activeSource = src;
        }
    }
};

const actions = {
    [a.FETCH_ARTICLES] ({ commit }, { url }) {
        commit(m.FETCHING_ARTICLES, true);
        console.log('FETCH_ARTICLES');
        console.log(url);
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        parser.parseURL(CORS_PROXY + url) //  'http://feeds.feedburner.com/juznevesti')
            .then(feed => {
                commit(m.SET_ARTICLES, { items: feed.items });
            })
            .catch(e => {
                commit(m.FETCHING_ARTICLES_FAILED);
                console.log('error');
                console.log(e);
            });
    }
    // [a.FETCH_SAP] ({ commit }) {
    //     commit(m.SAP_REQUEST);
    //
    //     return backend.sap.getSap()
    //         .then(sap => {
    //             commit(m.SAP_SUCCESS, sap);
    //             return sap;
    //         })
    //         .catch(err => {
    //             commit(m.SAP_FAILED);
    //             throw err;
    //         });
    // }
};

export default {
    state,
    actions,
    mutations,
    getters
};
