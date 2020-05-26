
var express = require('express');
const router = require('./routes/apiFunctions.js');
var app = express();
var swagger = require('./swagger.js');
var timeout = require('connect-timeout');




// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.use(function (req, res, next) {
    res.setTimeout(60000, function () {
        console.log("Connection timedout");
    });
    next();
})
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('', router)

app.use("/api-docs", swagger.serve, swagger.setup);