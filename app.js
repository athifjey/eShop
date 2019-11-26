const express = require('express');
const path = require('path');

const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// To handle CORS orgin
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



const carsRoutes = require('./routes/cars')
const timingsRoutes = require('./routes/timings')
const orderRoutes = require('./routes/orders')

app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api/cars', carsRoutes);
app.use('/api/timings', timingsRoutes);
app.use('/api/orders', orderRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

// To handle 404
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

// To handle other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;