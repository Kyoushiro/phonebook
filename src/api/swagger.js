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
            servers: ["[https://phonebook-277012.ey.r.appspot.com"]
        }
    },
    // ['.routes/*.js']
    apis: ["./routes/routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerDocs)
}