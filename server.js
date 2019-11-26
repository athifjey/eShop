// require http modules first

const http = require('http');
const path = require('path');
const express = require('express');
const env = require('./config/env.json')

//import app.js file
const app = require('./app');

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

const port = process.env.PORT || env.boomCar.port;
const server = http.createServer(app);

server.listen(port, () => {
    //    let's print a message when the server run successfully
    console.log("Server restarted successfully")
});