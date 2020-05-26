var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Phonebook API",
            description: "Shows the methods you can use in phonebook app",
            contact: {
                name: "Oskari"
            },
            servers: ["http://localhost:8081"]
        }
    },
    // ['.routes/*.js']
    apis: ["server.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

var appjs = "http://localhost:3000";

var mysql = require('mysql');
var con = mysql.createConnection({
    //socketPath: "/cloudsql/phonebook-277012:europe-north1:phonebook",
    user: 'phonebook',
    password: 'Lollero1234',
    host: "localhost",
    port: '3306',
    database: "contacts",

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
    console.log("port");
    console.log("Example app listening at http://%s:%s", host, port)
})


// Routes
/**
 *  @swagger
 * /add_user:
 *  post:
 *    description: Use to add a new user
 *    parameters:
 *      - name: name
 *        in: query
 *        description: Name of the contact
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *      - name: phoneNumber
 *        in: query
 *        description: Phonenumber of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: email
 *        in: query
 *        description: Email of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully added a user
 * 
 */

app.post('/add_user', urlencodedParser, function (req, res) {
    console.log("req", req);
    console.log("res", res);
    let randomId = Math.random(0, 100) + 1;
    name = req.query.name,
        phoneNumber = req.query.phoneNumber,
        email = req.query.email,
        id = randomId

    var sql = `INSERT INTO contacts (name, phonenumber, email, id ) VALUES ('${name}', '${phoneNumber}', '${email}', '${id}')`;
    con.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record inserted");
    });

    res.redirect(appjs);
})

/**
 *  @swagger
 * /get_users:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        descripti
 * 
 * 
 */

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

})

/**
 *  @swagger
 * /delete_user:
 *  post:
 *    description: Use to delete a user
 *    responses:
 *      '200':
 *        description: successfully deleted a user
 * 
 */

app.post('/delete_user', urlencodedParser, function (req, res) {

    id = req.body.id

    var sql = `DELETE FROM contacts WHERE id='${id}'`
    con.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record deleted");
    });

    res.redirect(appjs);
})

/**
 *  @swagger
 * /update_user:
 *  put:
 *    description: Use to update a user
 *    responses:
 *      '200':
 *        description: Successfully updated a user
 * 
 */

app.put('/update_user', urlencodedParser, function (req, res) {

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