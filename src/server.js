var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var appjs = "http://localhost:3000";

var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lollero1234',
    port: '3306',
    database: "contact",
    //localAddress: "http://192.168.0.1"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");


});



var urlencodedParser = bodyParser.json();

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

app.post('/add_user', urlencodedParser, function (req, res) {


    name = req.body.name,
        phoneNumber = req.body.phoneNumber,
        email = req.body.email,
        id = req.body.id

    var sql = `INSERT INTO contacts (name, phonenumber, email, id ) VALUES ('${name}', '${phoneNumber}', '${email}', '${id}')`;
    con.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record inserted");
    });

    res.redirect(appjs);
})

app.get('/get_users', function (req, res) {
    var array = [];
    console.log("getting users");
    var sql = `SELECT * FROM contacts`;
    con.query(sql, function (err, data) {
        if (err) throw err;
        console.log("records received");
        array.push(data);
        res.send(data);

    });
    //array.push(sql);
    //res.redirect(appjs);

})

app.post('/delete_user', urlencodedParser, function (req, res) {

    id = req.body.id

    var sql = `DELETE FROM contacts WHERE id='${id}'`
    con.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record deleted");
    });

    res.redirect(appjs);
})

app.post('/update_user', urlencodedParser, function (req, res) {

    name = req.body.name,
        phoneNumber = req.body.phoneNumber,
        email = req.body.email,
        id = req.body.id

    var sql = `UPDATE contacts SET name = '${name}', phoneNumber = '${phoneNumber}',
    email = '${email}' WHERE id='${id}'`
    con.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record updated");
    });

    res.redirect(appjs);
})