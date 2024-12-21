import express from 'express';
import mysqlDb from "./mysqlDb";
import newsRouter from "./routes/news/news";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/news", newsRouter);

const run = async () => {
    try {
        await mysqlDb.init();
        app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
    }catch(e) {
        console.error(e);
    }
};

run().catch(e => console.error(e));