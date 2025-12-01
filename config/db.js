const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hello12345",
    database: "myapp"
});


module.exports = connection;