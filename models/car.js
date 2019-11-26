module.exports = function (sequelize, Sequelize) {
    var Cars = sequelize.define('cars', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        custName: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        carId: {
            type: Sequelize.INTEGER
        },
        carName: {
            type: Sequelize.STRING
        },
        carBrand: {
            type: Sequelize.STRING
        },
        carModel: {
            type: Sequelize.STRING
        },
        carMakeYear: {
            type: Sequelize.INTEGER
        },
        avlDateFrom: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        avlTimeFrom: {
            type: Sequelize.TIME
        },
        avlDateTo: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        avlTimeTo: {
            type: Sequelize.TIME
        }

    },
        {
            freezeTableName: true,
        },
        {
            timestamps: false
        });
    return Cars;
}