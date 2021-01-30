<template>
    <div>
        <search-feeds-text @onSearchFeeds="onSearchFeeds"></search-feeds-text>
    <v-list
        subheader
        two-line
        >
        <v-list-item
            v-for="folder in feeds"
            :key="folder.title"
            >
            <v-list-item-avatar>
                <v-icon
                    class="grey lighten-1"
                    dark
                    >
                    mdi-folder
                </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title v-text="folder.title"></v-list-item-title>

                <v-list-item-subtitle v-text="folder.href"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn icon>
                    <v-icon color="grey lighten-1" @click="addFeed(folder)">mdi-plus</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-divider inset></v-divider>

    </v-list>
    </div>
</template>

<script>
import SearchFeedsText from '../components/SearchFeedsText';
import * as m from '../store/mutation_types';
import * as htmlparser2 from 'htmlparser2';
import { CORS_PROXY } from '../settings.js';

export default {
    name: 'SearchFeedsResults',
    components: {
        SearchFeedsText
    },
    data: function () {
        return {
            feeds: [
                // {
                //     href: 'Jan 9, 2014',
                //     title: 'Photos'
                // },
                // {
                //     href: 'Jan 17, 2014',
                //     title: 'Recipes'
                // },
                // {
                //     href: 'Jan 28, 2014',
                //     title: 'Work'
                // }
            ]
        };
    },
    props: {
    },
    methods: {
        onSearchFeeds: function (url) {
            console.log('search: ' + url);
            fetch(CORS_PROXY + url)
                .then(r => {
                    console.log('ende');
                    r.text()
                        .then(t => {
                            console.log(t);
                            this.extractRssFeeds(t, url);
                        });
                })
                .catch(e => {
                    console.log('err');
                    console.log(e);
                });
        },
        extractRssFeeds: function (html, url) {
            const links = [];
            const prepareHref = this.prepareHref;
            const parser = new htmlparser2.Parser({
                onopentag (name, attributes) {
                    /*
                     * This fires when a new tag is opened.
                     *
                     * If you don't need an aggregated `attributes` object,
                     * have a look at the `onopentagname` and `onattribute` events.
                     */
                    if (name === 'link' &&
                        (attributes.type === 'application/rss+xml' ||
                            attributes.type === 'application/atom+xml')) {
                        console.log('-> found: ');
                        console.log(attributes);
                        links.push({
                            title: attributes.title === undefined ? url : attributes.title,
                            href: prepareHref(attributes.href, url)
                        });
                    }
                },
                ontext (text) {
                    /*
                     * Fires whenever a section of text was processed.
                     *
                     * Note that this can fire at any point within text and you might
                     * have to stich together multiple pieces.
                     */
                },
                onclosetag (tagname) {
                    /*
                     * Fires when a tag is closed.
                     *
                     * You can rely on this event only firing when you have received an
                     * equivalent opening tag before. Closing tags without corresponding
                     * opening tags will be ignored.
                     */
                }
            });
            console.log('write');
            parser.write(html);
            console.log('ende');
            parser.end();
            console.log('----');
            console.log(links);
            this.feeds = links;
        },
        prepareHref: function (rssHref, url) {
            if (rssHref.startsWith('http://') || rssHref.startsWith('https://')) {
                return rssHref;
            }

            if (!url.endsWith('/')) {
                url += '/';
            }

            if (rssHref.startsWith('/')) {
                rssHref = rssHref.substring(1);
            }

            return url + rssHref;
        },
        addFeed: function (item) {
            console.log(item);
            this.$store.commit(m.ADD_SOURCE, {
                title: item.title,
                url: item.href
            });
        }
    }
};
</script>
