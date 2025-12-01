const connection = require("../config/db.js");

const getUsers = (req, res) => {
    let q = "SELECT COUNT(*) AS count FROM user";
    connection.query(q, (err, result) => {
        if (err) throw err;
        res.render("home.ejs", { count: result[0].count });
    });
}

const showUsers = (req, res) => {
    let q = "SELECT * FROM user";
    connection.query(q, (err, result) => {
        if (err) throw err;
        res.render("show.ejs", { result });
    });
}

const createForm = (req, res) => {
    res.render("create.ejs");
}

const createUser = (req, res) => {
    const { id, username, email, password } = req.body;
    let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
    connection.query(q, [id, username, email, password], (err) => {
        if (err) throw err;
        res.redirect('/users');
    });
}

const updateUser = (req, res) => {
    let { id } = req.params;
    let { username } = req.body;
    let q =  "UPDATE user SET username = ? WHERE id = ?";
    connection.query(q, [username, id], (err, result) => {
        if(err) throw err;
        res.redirect('/users');
    })
}


const UpdateForm = (req, res) => {
   let { id } = req.params;
   let q = "SELECT * FROM user WHERE id = ?"
   connection.query(q, [id], (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
   })
}


const deleteUser = (req, res) => {
    const { id } = req.params;
    let q = "DELETE FROM user WHERE id = ?";
    connection.query(q, [id], (err) => {
        if (err) throw err;
        res.redirect('/users');
    });
}

module.exports = {getUsers, showUsers, createForm, createUser, updateUser, UpdateForm, deleteUser}

