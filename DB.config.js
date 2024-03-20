require('dotenv').config()
const mysql = require('mysql2');

const DBconnection = mysql.createPool({
    host:"db4free.net",
    user:"investoxx",
    password:"investoxx@123",
    database:"investoxx",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

if(DBconnection){
    console.log("Database connected");
    module.exports = DBconnection;

}else{
    console.log("Database not connected");
    
}