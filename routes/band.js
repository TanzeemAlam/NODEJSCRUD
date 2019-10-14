//Create User Table Structure
var Sequelize = require('sequelize');
var connection = require('./connection')

var Band = connection.define('Band', {
    BAND_ID: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
    BAND_NAME: Sequelize.STRING,
    BAND_DESCRIPTION:Sequelize.STRING,
    USER_ID:Sequelize.STRING    
},{timestamps:false});
 
//Applying Item Table to database
connection.sync({
    loggin:console.log,
 }).then(()=>{
    console.log('Connection to Band table created successfully');
 })
 

module.exports = Band;