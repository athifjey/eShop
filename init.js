// require http modules first

const http = require('http');

//import app.js file
const migrate = require('./migrate');

const port = process.env.PORT || 3200;
const server = http.createServer(migrate);

server.listen(port, () => {
    //    let's print a message when the server run successfully
    console.log("Server restarted successfully")
});