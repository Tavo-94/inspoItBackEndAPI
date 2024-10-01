import express from 'express';
import bodyParser from 'body-parser';
import fileSystem from 'fs';
import testRoute from './routes/test.js';

const app = express();

app.use(express.json());

app.use('/test', testRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Get Request!!!');
});

app.post('/', (req, res) => {

    try {
        const data = req.body;
        console.log(data);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

})

app.put('/user', (req, res) => {
    res.send('Put Request!!!');
})

app.delete('/user', (req, res) => {
    res.send('Delete Request!!!');
})