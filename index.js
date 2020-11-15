// code away!
require('dotenv').config();
const server = require('./server.js')
const PORT = process.env.PORT || 4000;

server.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`)
})

