const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3000,
    },
    db: {
        uri: process.env.MONGO_URI_DEV,
        name: process.env.DEV_DB_NAME || "dbDev",
    },
};

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3000,
    },
    db: {
        uri: process.env.MONGO_URI_PRO,
        name: process.env.PRO_DB_NAME || "dbPro",
    },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
