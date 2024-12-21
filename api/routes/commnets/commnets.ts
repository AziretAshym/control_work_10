import express from 'express';
import mysqlDb from '../../mysqlDb';
import { Comment, CommentWithoutId } from '../../types';
import { ResultSetHeader } from 'mysql2';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM comments');
    const comment = result as Comment[];

    res.send(comment);

});

commentsRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query("SELECT * FROM comments WHERE id = ?", [id]);

    const comment = result as Comment[];

    if (comment.length === 0) {
        res.status(404).send({ error: "Not found" });
    } else {
        res.send(comment[0])
    }
});

commentsRouter.post('/', async (req, res) => {
    const connection = await mysqlDb.getConnection();

    try {
        const { news_id, author, comment } = req.body as CommentWithoutId;

        if (!news_id || !comment) {
            res.status(404).send({ error: "News ID and comment can not be empty" });
            return;
        }

        const [newsResult] = await connection.query("SELECT * FROM news WHERE id = ?", [news_id]);
        if ((newsResult as Comment[]).length === 0) {
            res.status(404).send({ error: `News with id '${news_id}' not exist.` });
            return;
        }

        const newComment: CommentWithoutId = {
            news_id,
            author: author || 'Anonymous',
            comment,
        };

        const [result] = await connection.query(
            "INSERT INTO comments (news_id, author, text) VALUES (?, ?, ?)",
            [newComment.news_id, newComment.author, newComment.comment]
        );

        const resultHeader = result as ResultSetHeader;

        const [createdComment] = await connection.query("SELECT * FROM comments WHERE id = ?", [resultHeader.insertId]);
        res.status(201).send(createdComment);
    } catch (e) {
        console.error(e);
    }
});


commentsRouter.delete('/:id', async (req, res) => {
    const connection = await mysqlDb.getConnection();

    try {
        const commentId = req.params.id;

        const [result] = await connection.query("DELETE FROM comments WHERE id = ?", [commentId]);
        const affectedRows = (result as ResultSetHeader).affectedRows;

        if (affectedRows === 0) {
            res.status(404).send({ error: "Comment not found." });
        } else {
            res.send({ message: "Comment deleted." });
        }
    } catch (e) {
        console.error(e);
    }
});

export default commentsRouter;
