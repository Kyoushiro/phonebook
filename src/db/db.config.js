var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lollero1234',
    port: '3306',
    database: "contact",
    localAddress: "http://192.168.0.1"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");


});

module.exports = con;


