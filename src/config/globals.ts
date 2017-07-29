const globals = {
    isDev: process.env.NODE_ENV === 'development',

    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,

    USER_TOKEN: process.env.USER_TOKEN,
    BOT_TOKEN: process.env.BOT_TOKEN,
    USER_ID: process.env.USER_ID,

    highlightWords: [
        /yoni/i
    ],
    highlightExceptions: [
        /psyonix/i,
        /yoni25t/i
    ]
}

export {
    globals
}
