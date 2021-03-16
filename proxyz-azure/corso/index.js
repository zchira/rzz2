const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    console.log('query:');
    console.log(req.query);
    const url = req.query.q;
    console.log(url);
    if (url === undefined) {
        context.res = {
            statue: 404,
            body: 'qurey param q not set'
        };
        return;
    }

    const response = await fetch(url);
    if (response.ok) {
        const text = await response.text();
        context.res = {
            body: text
        };
        return;
    } else {
        context.res = {
            status: response.status,
            body: 'fetch failed'
        }
    }


    /* const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, // Defaults to 200
        body: responseMessage
    }; */ 
}
