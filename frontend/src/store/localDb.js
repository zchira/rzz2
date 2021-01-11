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
    save: function (sources) {
        localStorage.setItem('sources', JSON.stringify(sources));
    },

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
        return toRet;
    },

    clear: function () {
        localStorage.removeItem('source');
    }
};
