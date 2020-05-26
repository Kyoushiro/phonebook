var mysql = require('promise-mysql');
const createPool = async () => {
    return await mysql.createPool({
        user: 'phonebook', // e.g. 'my-db-user'
        password: 'Lollero1234', // e.g. 'my-db-password'
        database: "contacts", // e.g. 'my-database'
        // If connecting via unix domain socket, specify the path
        socketPath: "/cloudsql/phonebook-277012:europe-west3:phonebook2"
    });

};

module.exports = createPool;