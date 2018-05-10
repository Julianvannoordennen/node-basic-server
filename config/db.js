//MYSQL Library downloaden
const mysql = require('mysql');

//Verbindingsarray maken
var connectionData = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

//Verbinding opzetten d.m.v. omgevingsvariabelen
const connection = mysql.createConnection(connectionData);

//Verbinden
connection.connect((error) => {

    //Controleren op fouten
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Connected to " + connectionData.host + ":" + connectionData.database);
    }
});

//Connectie beschikbaar maken
module.exports = connection;