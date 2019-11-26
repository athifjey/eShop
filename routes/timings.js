const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var fs = require('fs');
var Sequelize = require('sequelize');

var Cars = require('../models').cars;

// const cars = require('../data/cars.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var cars;
var timings;
var fileData;

function fetchData() {
    fs.readFile('./data/cars.json', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        fileData = data
        processFile();
    });
}

function processFile() {
    cars = JSON.parse(fileData)
}


fetchData();

// handle incoming request to /cars/timings, filter the results by available timings
router.get('/', (req, res, next) => {
    if (req.headers.avldatefrom && req.headers.avldateto) {
        const Op = Sequelize.Op;
        var startDate = new Date(req.headers.avldatefrom);
        var endDate = new Date(req.headers.avldateto);
        const where = {
            avlDateFrom: {
                [Op.between]: [startDate, endDate]
            }
        };


        Cars.findAll({ where: where }).then(cars => {
            if (cars.length != 0) {
                res.status(200).json({
                    success: true,
                    cars: cars
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: 'No cars found'
                });
            }
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'Require from and to date fields'
        });
    }
});


// handle incoming request to /cars/timings/{carId}
router.get('/:carId', (req, res, next) => {
    const carId = parseInt(req.params.carId, 10);

    Cars.findOne({ where: { carId: carId } }).then(cars => {
        if (cars != null) {
            res.status(200).json({
                success: true,
                cars: cars
            });
        } else {
            res.status(200).json({
                success: false,
                message: 'No cars found for this ID'
            });
        }
    }).error(err => {
        res.send('error has occured');
    });
});



// To add/update car availability timings
router.put('/:carId', (req, res) => {
    const reqBody = req.body;
    const carId = parseInt(req.params.carId, 10);


    Cars.update({        
        avlDateFrom: req.body.avlDateFrom,
        avlTimeFrom: req.body.avlTimeFrom,
        avlDateTo: req.body.avlDateTo,
        avlTimeTo: req.body.avlTimeTo
    },{ 
        where: { carId: carId } 
    }).then(result => {
        res.status(200).send({
            success: 'true',
            message: 'Car details updated successfully',
            reqBody,
        });
    });
});


module.exports = router;