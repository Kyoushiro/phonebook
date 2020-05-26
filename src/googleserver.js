const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.json();
var appjs = "http://localhost:3000";


var mysql = require('mysql');
var con = mysql.createConnection({
    //host: "localhost",
    socketPath: "/cloudsql/phonebook-277012:europe-north1:phonebook",
    user: 'phonebook',
    password: 'Lollero1234',
    //port: '3306',
    database: "contacts",
    //localAddress: "http://192.168.0.1"

});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("port");
    console.log(host);
    console.log(port);
    console.log("Example app listening at http://%s:%s", host, port);
})

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.post('/add_user', urlencodedParser, function (req, res) {
    console.log("req", req);
    console.log("res", res);
    let randomId = Math.random(0, 100) + 1;
    name = req.body.name
    phoneNumber = req.body.phoneNumber,
        email = req.body.email,
        id = randomId

    var sql = `INSERT INTO contacts (name, phonenumber, email, id ) VALUES ('${name}', '${phoneNumber}', '${email}', '${id}')`;
    con.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record inserted");
    });

    res.redirect(appjs);
})