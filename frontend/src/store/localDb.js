const sources = [
    {
        title: 'Juzne Vesti',
        url: 'http://feeds.feedburner.com/juznevesti', // must be unique
        category: 'News'
    },
    {
        title: 'B92',
        url: 'http://feeds.feedburner.com/juznevesti',
        category: 'News'
    },
    {
        title: 'N1',
        url: '',
        category: 'News'
    },
    {
        title: 'Sport Klub',
        url: '',
        category: 'Sport'
    }
];
//     version: 1,
//     sources: [
//         {
//             title: 'Source title',
//             url: 'http://feeds.feedburner.com/juznevesti',
//             category: 'News'
//         }
//     ]
// };

export const db = {
    /**
    * save sources collecton to localStorage
    */
    save: function (sources) {
        localStorage.setItem('sources', JSON.stringify(sources));
    },
    /**
     * Load sources from localStorage('sources')
     */
    load: function () {
        let toRet = localStorage.getItem('sources');
        console.log(toRet);
        try {
            toRet = JSON.parse(toRet);
        } catch {
            toRet = undefined;
        }

        if (!toRet) {
            console.log(1);
            toRet = sources;
        }
        const u = this.sourcesToUrl(toRet);
        this.urlToSources(u);
        return toRet;
    },
    /**
     * clear local storage 'source'
     */
    clear: function () {
        localStorage.removeItem('source');
    },
    /**
     * transform sources collection to url friendly format
     */
    sourcesToUrl: function (sources) {
        const sourcesStr = JSON.stringify(sources);
        const toRet = encodeURIComponent(sourcesStr);
        console.log(toRet);
        console.log('length: ' + toRet.length);
        return toRet;
    },
    /**
     * transform url encoded sources list to sources collection
     */
    urlToSources: function (urlData) {
        const sourcesStr = decodeURIComponent(urlData);
        let toRet;
        try {
            toRet = JSON.parse(sourcesStr);
        } catch (_) {
            console.log('failed to parse ' + sourcesStr);
        }
        return toRet;
    }
};
