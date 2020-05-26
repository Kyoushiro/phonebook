var mysql = require('mysql');
var con = mysql.createConnection({
    //host: 'localhost',
    host: "35.228.9.33",
    user: 'phonebook',
    password: 'Lollero1234',
    port: '3306',
    database: "contact",
    socketPath: "phonebook-277012:europe-north1:phonebook"
    //localAddress: "http://192.168.0.1"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");


});

module.exports = con;


