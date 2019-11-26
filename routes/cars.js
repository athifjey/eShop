const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var fs = require('fs');

var Cars = require('../models').cars;

// const cars = require('../data/cars.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// handle incoming request to /cars
router.get('/', (req, res, next) => {
    Cars.findAll().then(cars => {
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
    
});


// handle incoming request to /cars/{id}
router.get('/:id', (req, res, next) => {
    const searchID = parseInt(req.params.id, 10);
   

    Cars.findOne({ where: { id: searchID } }).then(cars => {
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


// To add car data
router.post('/', (req, res) => {
    let newCarData = req.body;
    Cars.create({
        id: req.body.id,
        custName: req.body.custName,
        mobile: req.body.mobile,
        carId: req.body.carId,
        carName: req.body.carName,
        carBrand: req.body.carBrand,
        carModel: req.body.carModel,
        carMakeYear: req.body.carMakeYear,
        avlDateFrom: req.body.avlDateFrom,
        avlTimeFrom: req.body.avlTimeFrom,
        avlDateTo: req.body.avlDateTo,
        avlTimeTo: req.body.avlTimeTo
    }).then(cars => {
        console.log(cars.get({
            plain: true
        }));
        res.status(200).send({
            success: 'true',
            message: 'Car added successfully',
            newCarData
        });
    }).error(err => {
        res.send('error has occured');
    });;
})




// To update car data
router.put('/:id', (req, res) => {
    let updatedCarData = req.body;
    Cars.update({
        custName: req.body.custName,
        mobile: req.body.mobile,
        carId: req.body.carId,
        carName: req.body.carName,
        carBrand: req.body.carBrand,
        carModel: req.body.carModel,
        carMakeYear: req.body.carMakeYear,
        avlDateFrom: req.body.avlDateFrom,
        avlTimeFrom: req.body.avlTimeFrom,
        avlDateTo: req.body.avlDateTo,
        avlTimeTo: req.body.avlTimeTo
    },{ 
        where: { id: req.params.id } 
    }).then(result => {
        res.status(200).send({
            success: 'true',
            message: 'Car details updated successfully',
            updatedCarData,
        });
    });

});


module.exports = router;