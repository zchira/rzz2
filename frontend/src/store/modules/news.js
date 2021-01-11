import Parser from 'rss-parser';
import * as m from '../mutation_types';
import * as a from '../action_types';
import { db } from '../localDb';
const parser = new Parser();

let CORS_PROXY = '/cors/';

if (process.env.NODE_ENV === 'development') {
    // CORS_PROXY = 'http://127.0.0.1:4040/cors/';
    CORS_PROXY = 'http://192.168.1.122:4040/cors/';
}

const dbSources = db.load();

// initial state
const state = {
    sources: dbSources,
    activeCategory: dbSources[0].category,
    activeSource: dbSources[0],
    fetchingArticles: false,
    articles: []
};

const getters = {
    articles: state => state.articles,
    categories: state => [...new Set(state.sources.map(s => s.category))],
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
        if (state.sources.find(s => s.category === category)) {
            state.activeCategory = category;
        }
    },
    [m.SET_ACTIVE_SOURCE] (state, source) {
        console.log('SET_ACTIVE_SOURCE');
        console.log(source.title);
        const src = state.sources.find(f => f.url === source.url);
        if (src !== undefined) {
            console.log(src.title);
            state.activeSource = src;
        }
    },
    [m.ADD_SOURCE] (state, { title, url, category }) {
        if (category === undefined) {
            category = state.activeCategory;
        }

        const exist = state.sources.find(s => s.url === url);
        if (exist !== undefined) {
            console.log('WARNING: source already exists');
        }

        state.sources.push({
            title,
            url,
            category
        });
        db.save(state.sources);
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
};

export default {
    state,
    actions,
    mutations,
    getters
};
