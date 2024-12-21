import express from "express";
import mysqlDb from "../../mysqlDb";
import {News, NewsWithoutId} from "../../types";
import {imagesUpload} from "../../multer";
import {ResultSetHeader} from "mysql2";

const newsRouter = express.Router();

newsRouter.get('/', async (_req, res) => {
    const connection = await mysqlDb.getConnection();

    const [result] = await connection.query('SELECT * FROM news');
    const news = result as News[];

    res.send(news);
});

newsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query("SELECT * FROM news WHERE id = ?", [id]);

    const news = result as News[];

    if (news.length === 0) {
        res.status(404).send({ error: "Not found" });
    } else {
        res.send(news[0]);
    }
});

newsRouter.post('/', imagesUpload.single("image"), async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            res.status(400).send("Title and content cannot be empty.");
            return;
        }

        const connection = await mysqlDb.getConnection();

        const news: NewsWithoutId = {
            title: req.body.title,
            content: req.body.content,
            image: req.file ? "images/" + req.file.filename : null,
        };

        const [result] = await connection.query(
            "INSERT INTO news (title, content, image) VALUES (?, ?, ?)",
            [news.title, news.content, news.image]
        );

        const resultHeader = result as ResultSetHeader;
        const [resultCreatedNews] = await connection.query("SELECT * FROM news WHERE id = ?", [resultHeader.insertId]);
        const createdNews = resultCreatedNews as News[];

        if (createdNews.length === 0) {
            res.status(404).send({ error: "Failed to fetch the newly created news." });
        } else {
            res.status(201).send(createdNews[0]);
        }
    } catch (e) {
        console.error(e);
    }
});

newsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();

    try {
        const [result] = await connection.query("DELETE FROM news WHERE id = ?", [id]);
        const affectedRows = (result as ResultSetHeader).affectedRows;

        if (affectedRows === 0) {
            res.status(404).send({ error: "News not found." });
        } else {
            res.send({ message: "News deleted." });
        }
    } catch (e) {
        console.error(e);
    }
})


export default newsRouter;