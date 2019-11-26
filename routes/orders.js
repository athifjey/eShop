const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var fs = require('fs');

var Orders = require('../models').orders;

// const orders = require('../data/orders.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// handle incoming request to /orders
router.get('/', (req, res, next) => {
    Orders.findAll().then(orders => {
        if (orders.length != 0) {
            res.status(200).json({
                success: true,
                orders: orders
            });
        } else {
            res.status(200).json({
                success: false,
                message: 'No orders found'
            });
        }
    });

});



// To add order data
router.post('/', (req, res) => {
    let newOrderData = req.body;
    Orders.create({
        orderid: req.body.orderid,
        servicenumber: req.body.servicenumber,
        segmentgroup: req.body.segmentgroup,
        productname: req.body.productname,
        orderstatus: req.body.orderstatus,
        remark: req.body.remark,
        state: req.body.state
    }).then(orders => {
        console.log(orders.get({
            plain: true
        }));
        res.status(200).send({
            success: 'true',
            message: 'Order added successfully',
            newOrderData
        });
    }).error(err => {
        res.send('error has occured');
    });;
})


// To update order data
router.put('/:id', (req, res) => {
    let updatedOrderData = req.body;
    Orders.update({
        orderid: req.body.orderid,
        servicenumber: req.body.servicenumber,
        segmentgroup: req.body.segmentgroup,
        productname: req.body.productname,
        orderstatus: req.body.orderstatus,
        remark: req.body.remark,
        state: req.body.state
    }, {
            where: { orderid: req.params.id }
        }).then(result => {
            res.status(200).send({
                success: 'true',
                message: 'Order details updated successfully',
                updatedOrderData,
            });
        });

});


// To delete order data

router.delete('/:id', (req, res) => {
    Orders.destroy({
        where: {
            orderid: req.params.id
        }
    })
        .then(deletedRecord => {
            if (deletedRecord === 1) {
                res.status(200).send({
                    success: 'true',
                    message: 'Order deleted successfully'
                });
            } else {
                res.status(404).send({
                    success: 'false',
                    message: 'Order ID not found'
                })
            }
        })
})


module.exports = router;