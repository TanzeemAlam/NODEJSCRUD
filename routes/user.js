//Create User Table Structure
var Sequelize = require('sequelize');
var connection = require('./connection')

var User = connection.define('User', {
    USER_ID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
    USER_NAME:Sequelize.STRING,
    USER_COMPANY:Sequelize.STRING,
    USER_DOB:Sequelize.STRING,
    USER_EMAIL: Sequelize.STRING,
    USER_PASSWORD:Sequelize.STRING
},{timestamps:false});
 
//Applying Item Table to database
connection.sync({
    loggin:console.log,
 }).then(()=>{
    console.log('Connection to User table created successfully');
 })
 

module.exports = User;