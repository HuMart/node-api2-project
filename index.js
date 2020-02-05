const express = require('express');

const Posts = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ response: "server running" });
})

const port = 8000;

server.listen(port, () => console.log(`\n *** api on port: ${port} *** `));