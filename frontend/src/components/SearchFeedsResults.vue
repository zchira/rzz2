<template>
    <div>
        <search-feeds-text @onSearchFeeds="onSearchFeeds"></search-feeds-text>
    <v-list
        subheader
        two-line
        >
        <v-list-item
            v-for="folder in folders"
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

                <v-list-item-subtitle v-text="folder.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-divider inset></v-divider>

    </v-list>
    </div>
</template>

<script>
import SearchFeedsText from './SearchFeedsText.vue';
import * as htmlparser2 from 'htmlparser2';

export default {
    name: 'SearchFeedsResults',
    components: {
        SearchFeedsText
    },
    data: function () {
        return {
            folders: [
                {
                    subtitle: 'Jan 9, 2014',
                    title: 'Photos'
                },
                {
                    subtitle: 'Jan 17, 2014',
                    title: 'Recipes'
                },
                {
                    subtitle: 'Jan 28, 2014',
                    title: 'Work'
                }
            ]
        };
    },
    props: {
    },
    methods: {
        onSearchFeeds: function (url) {
            console.log('search: ' + url);
            fetch('http://192.168.1.122:4040/cors/' + url)
                .then(r => {
                    console.log('ende');
                    r.text()
                        .then(t => {
                            console.log(t);
                            this.extractRssFeeds(t);
                        });
                })
                .catch(e => {
                    console.log('err');
                    console.log(e);
                });
        },
        extractRssFeeds: function (html) {
            const links = [];
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
                            title: attributes.href
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
            this.folders = links;
        }
    }
};
</script>
