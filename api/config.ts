import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, "public"),
    database: {
        host: 'localhost',
        user: 'root',
        password: '1qaz@WSX29',
        database: 'news_db_aziret',
    }
};

export default config;