const express = require('express');
var fs = require('fs');
const morgan = require('morgan');
var Sequelize = require('sequelize');
const env = require('./config/env.json')

const migrate = express();


migrate.use(morgan('dev'));

var fileData;

function fetchData() {
    fs.readFile('./data/orders.json', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        fileData = data
        processFile();
    });
}

function processFile() {
    orders = JSON.parse(fileData)
}

fetchData();

var sequelize = new Sequelize(env.dbconn.database, env.dbconn.username, env.dbconn.password, {
    host: env.dbconn.host,
    port: env.dbconn.port,
    dialect: env.dbconn.dialect
});

// Checking connection status
sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});

//Create Item Table Structure
var Orders = sequelize.define('orders', {
    orderid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    servicenumber: {
        type: Sequelize.INTEGER
    },
    segmentgroup: {
        type: Sequelize.STRING
    },
    productname: {
        type: Sequelize.STRING
    },
    orderstatus: {
        type: Sequelize.STRING
    },
    remark: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    }
}, {
        freezeTableName: true,
    });

//Applying Item Table to database
Orders.sync({ force: true }).then(function () {
    // Table created
    return Orders.bulkCreate(orders, { returning: true }
    ).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});

module.exports = migrate;