const server = require('./api/server.js');

// server.get('/', (req, res) => {
//     res.status(200).json({ response: "server running" });
// })



server.listen(8000, () => console.log(`\n *** api on port: http://localhost:8000 *** `));