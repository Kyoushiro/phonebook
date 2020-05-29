
var express = require('express');
var app = express();
var swagger = require('./swagger.js');
var api = require('./routes/routes.js');
var createPool = require('./routes/dbConfig.js');
var cors = require('cors');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.json();

var array = [];
// Allow cross requests
app.use((req, res, next) => {
    res.set('Content-Type', 'text/html');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options('/update_user', cors())
// Assures that contacts table exists in database
const ensureSchema = async (pool) => {
    // Wait for tables to be created (if they don't already exist).
    await pool.query(
        `CREATE TABLE IF NOT EXISTS contacts
        ( id SERIAL NOT NULL, name CHAR(20) NULL,
        phoneNumber CHAR(14) NOT NULL, email CHAR(254), PRIMARY KEY (id) );`
    );
    console.log(`Ensured that table 'contacts' exists`);

};

//Check if contacts database already exists. If not, create it
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

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
// Set timeout to 1 minute
app.use(function (req, res, next) {
    res.setTimeout(60000, function () {
        console.log("Connection timedout");
    });
    next();
})

//Call api function accordingly
app.get('/get_users', function (req, res) {
    api.getUsers(pool, array, res);
})

app.post('/add_user', urlencodedParser, function (req, res) {
    api.addUser(req, res, array, pool);
})
app.post('/delete_user', urlencodedParser, function (req, res) {
    api.deleteUser(req, res, pool);
})
app.put('/update_user', cors(), urlencodedParser, function (req, res) {
    api.updateUser(req, res, pool);
})
// Create api page
app.use("/api-docs", swagger.serve, swagger.setup);