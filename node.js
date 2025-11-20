const { faker } = require('@faker-js/faker');
const mySQL = require('mysql2');
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const methodOveride = require('method-override');


app.use(methodOveride("_method"));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myApp',
    password: 'hello12345'
});

const getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
    ]
}

// let data = [];

// for(let i=1; i<=100; i++){
//     data.push(getRandomUser());
// }

//let q = 'INSERT INTO user (id, username, email, password) VALUES ?';

// connection.query(q, [data], (error, result) => {
//     try {
//         if(error) throw error;
//         console.log(result);
//     } catch (error) {
//         console.log(error)
//     }
// });

app.get('/', (req, res) => {
    let q = 'SELECT count(*) FROM user';
    try {
        connection.query(q, (error, result) => {
        if(error) throw error;
        let user = result[0]["count(*)"];
        res.render('home.ejs', {user});
    })
    } catch (error) {
        console.log(error);
    }
});

app.get('/users', (req, res) => {
    let q = 'SELECT * FROM user';
    try {
        connection.query(q, (error, users) => {
            if(error) throw error;
            res.render('show.ejs', {users});
        })
    } catch (error) {
        console.log(error)
    }
});

// app.patch();

app.get('/users/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
       connection.query(q, (error, result) => {
        if(error) throw error;
        let user = result[0]
        res.render('edit.ejs', {user});
       }) 
    } catch (error) {
        console.log(error)
    }
});

app.patch('/users/:id', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
       connection.query(q, (error, result) => {
        if(error) throw error;
        let user = result[0]
        res.render('edit.ejs', {user});
       }) 
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log('App is running on port', port);
})