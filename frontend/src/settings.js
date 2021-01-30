let CORS_PROXY = '/cors/';

if (process.env.NODE_ENV === 'development') {
    // CORS_PROXY = 'http://127.0.0.1:4040/cors/';
    CORS_PROXY = 'http://127.0.0.1:4040/cors/';
}

export { CORS_PROXY };
