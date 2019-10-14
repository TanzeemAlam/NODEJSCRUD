//Including dependency
var Sequelize = require('sequelize');
 
//Setting up the config
var connection = new Sequelize('nodejsdb', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

connection.sync({
   logging:console.log,
}).then(()=>{
   console.log('Connection to database established successfully');
})

module.exports = connection;