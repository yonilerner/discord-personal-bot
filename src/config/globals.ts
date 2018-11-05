const globals = {
    isDev: process.env.NODE_ENV === 'development',

    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,

    USER_ID: process.env.USER_ID,
    BOT_TOKEN: process.env.BOT_TOKEN,

    highlightWords: [
        /yoni/i,
        /yoniee/i,
        /yonee/i
    ],
    highlightExceptions: [
        /psyonix/i,
        /yoni25t/i
    ],

    PORT: process.env.NODE_PORT || 8080,

    MONGO_URL: process.env.MONGO_URL || ''
}

export {
    globals
}
