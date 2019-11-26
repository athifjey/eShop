var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

const env = require('../config/env.json')

var sequelize = new Sequelize(env.dbconn.database, env.dbconn.username, env.dbconn.password, {
    host: env.dbconn.host,
    port: env.dbconn.port,
    dialect: env.dbconn.dialect
});
var db = {};
 
fs.readdirSync(__dirname).filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    }).forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;