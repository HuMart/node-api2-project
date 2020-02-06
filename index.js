const express = require('express');

const Posts = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/posts', (req, res) => {
    const postData = req.body;
    const { title, contents } = req.body;

    if( !title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    Posts.insert(postData)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})

server.get('/', (req, res) => {
    res.status(200).json({ response: "server running" });
})

const port = 8000;

server.listen(port, () => console.log(`\n *** api on port: ${port} *** `));