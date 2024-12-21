import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());

const run = async () => {
    try {
        app.listen(port, () => console.log(`Listening on port ${port}`));
    }catch(e) {
        console.error(e);
    }
}