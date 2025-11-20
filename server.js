const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodoverride = require("method-override");

app.use(methodoverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public" )));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hello12345",
    database: "myapp"
});

// HOME ROUTE
app.get('/', (req, res) => {
    let q = "SELECT COUNT(*) AS count FROM user";
    connection.query(q, (err, result) => {
        if (err) throw err;
        res.render("home.ejs", { count: result[0].count });
    });
});

// SHOW ALL USERS
app.get('/users', (req, res) => {
    let q = "SELECT * FROM user";
    connection.query(q, (err, result) => {
        if (err) throw err;
        res.render("show.ejs", { result });
    });
});

// CREATE FORM
app.get('/users/new', (req, res) => {
    res.render("create.ejs");
});

// CREATE USER
app.post('/users', (req, res) => {
    const { id, username, email, password } = req.body;
    let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
    connection.query(q, [id, username, email, password], (err) => {
        if (err) throw err;
        res.redirect('/users');
    });
});

//UPDATE USER

app.patch('/users/:id', (req, res) => {
    let { id } = req.params;
    let { username } = req.body;
    let q =  "UPDATE user SET username = ? WHERE id = ?";
    connection.query(q, [username, id], (err, result) => {
        if(err) throw err;
        res.redirect('/users');
    })
})

app.get('/users/:id/edit', (req, res) => {
   let { id } = req.params;
   let q = "SELECT * FROM user WHERE id = ?"
   connection.query(q, [id], (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
   })
})

// DELETE USER
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let q = "DELETE FROM user WHERE id = ?";
    connection.query(q, [id], (err) => {
        if (err) throw err;
        res.redirect('/users');
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
