import Parser from 'rss-parser';
const parser = new Parser();
// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
// const CORS_PROXY = 'https://yacdn.org/proxy/';
// const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
// const CORS_PROXY = 'http://127.0.0.1:4040/cors/';
const CORS_PROXY = '/cors/';
// import * as m from '../mutation_types';
// import * as a from '../action_types';

// initial state
const state = {
    categories: [
        {
            name: 'News',
            id: 0
        },
        {
            name: 'Sport',
            id: 1
        }
    ],
    sources: [
        {
            name: 'Juzne Vesti',
            url: '',
            categotyId: 0
        },
        {
            name: 'B92',
            url: '',
            categotyId: 0
        },
        {
            name: 'Sport Klub',
            url: '',
            categotyId: 1
        }
    ],
    fetchingArticles: false,
    articles: []
};

const getters = {
    articles: state => state.articles
};

const mutations = {
    fetchingArticles (state, fetching) {
        state.fetchingArticles = fetching;
    },
    feedItems (state, { items }) {
        state.articles = items;
        state.fetchingArticles = false;
    }
    // [m.SAP_REQUEST] (state) {
    //     state.fetchingSapStreams = true;
    // },
    // [m.SAP_SUCCESS] (state, sap) {
    //     state.sapStreams = sap;
    //     state.fetchingSapStreams = false;
    // },
    // [m.SAP_FAILED] (state) {
    //     state.fetchingSapStreams = false;
    // }
};

const actions = {
    fetchArticles ({ commit }) {
        commit('fetchingArticles', true);
        parser.parseURL(CORS_PROXY + 'http://feeds.feedburner.com/juznevesti')
            .then(feed => {
                commit('feedItems', { items: feed.items });
            })
            .catch(e => {
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
