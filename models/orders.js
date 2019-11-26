module.exports = function (sequelize, Sequelize) {
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

    return Orders;
}