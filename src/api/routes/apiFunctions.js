var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.json();
var createPool = require('./dbConfig.js');
var cors = require('cors');

// Set headers for cross purposes
app.use((req, res, next) => {
    res.set('Content-Type', 'text/html');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Allows cross for updating a contact
app.options('/update_user', cors())

const ensureSchema = async (pool) => {
    // Wait for tables to be created (if they don't already exist).
    await pool.query(
        `CREATE TABLE IF NOT EXISTS contacts
        ( id SERIAL NOT NULL, name CHAR(20) NULL,
        phoneNumber CHAR(14) NOT NULL, email CHAR(254), PRIMARY KEY (id) );`
    );
    console.log(`Ensured that table 'contacts' exists`);

};


let pool;
const poolPromise = createPool()
    .then(async (pool) => {
        await ensureSchema(pool);
        return pool;
    })
    .catch((err) => {
        process.exit(1)
    });

app.use(async (req, res, next) => {
    if (pool) {
        return next();
    }
    try {
        pool = await poolPromise;
        next();
    }
    catch (err) {
        return next(err);
    }
});

//Setting up array, that is used to store contacts
var array = [];

// Front page
app.get("/", function (req, res) {
    res.send('Hello from API');
});




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
 *        description: Successfully added a new contact
 *      '408':
 *        description: Connection timed out
 *      
 *
 */
app.post('/add_user', urlencodedParser, async function (req, res) {

    var name = req.query.name;
    var phoneNumber = req.query.phoneNumber;
    var email = req.query.email;
    var id;
    // Checking request sent id and then creating new id for new contact accordingly
    if (req.body.id === null || req.body.id === undefined) {

        var newId = JSON.parse(array);
        var newArray = newId.map(data => data.id);
        var maxID = Math.max(...newArray);
        id = maxID + 1;
    }
    else {
        id = req.body.id;
    }

    // Adds new contact to database
    try {
        var sql = `INSERT INTO contacts (id, name, phonenumber, email ) VALUES (?, ?, ?, ?)`;
        await pool.query(sql, [id, name, phoneNumber, email]);
    }
    // Catches error if happens
    catch (err) {
        console.log(err);
        res
            .status(500)
            .send("unable to add a contact")
            .end();
    }
    res.status(200).send("successfully added a new contact").end();

})


/**
 *  @swagger
 * /get_users:
 *  get:
 *    description: Use to request all contacts
 *    responses:
 *      '200':
 *        description: Successfully got all contacts
 *      '408':
 *        description: Connection timed out
 *
 *
 */
app.get('/get_users', function (req, res) {
    // Gets all contacts from database
    var sql = `SELECT * FROM contacts`;
    pool.query(sql, function (err, data) {
        if (err) throw err;
        array.length = 0;
        array.push(JSON.stringify(data));


        res.send(data);
        res.end();

    });

})


/**
 *  @swagger
 * /delete_user:
 *  post:
 *    description: Use to delete a contact
 *    parameters:
 *      - name: id
 *        in: query
 *        description: Id of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: successfully deleted a contact
 *      '408':
 *        description: Connection timed out
 *
 */
app.post('/delete_user', urlencodedParser, function (req, res) {

    id = req.query.id
    // Deletes user from database by id
    var sql = `DELETE FROM contacts WHERE id='${id}'`
    pool.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record deleted");
    });
    res.end();
})


/**
 *  @swagger
 * /update_user:
 *  put:
 *    description: Use to update a contact
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
 *      - name: id
 *        in: query
 *        description: Id of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully updated a contact
 *      '408':
 *        description: Connection timed out
 *
 */
app.put('/update_user', cors(), urlencodedParser, function (req, res) {

    name = req.query.name,
        phoneNumber = req.query.phoneNumber,
        email = req.query.email,
        id = req.query.id
    // Updates user with given id
    var sql = `UPDATE contacts SET name = '${name}', phoneNumber = '${phoneNumber}',
    email = '${email}' WHERE id='${id}'`
    pool.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record updated");
    });
    res.end();
})
module.exports = app;