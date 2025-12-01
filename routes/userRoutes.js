const express = require("express");
const userRoutes = express.Router();
const {getUsers, showUsers, createForm, createUser, updateUser, UpdateForm, deleteUser} = require("../controllers/userController.js");

// HOME ROUTE
userRoutes.get('/', getUsers);

// SHOW ALL USERS
userRoutes.get('/users', showUsers);

// CREATE FORM
userRoutes.get('/users/new', createForm);

// CREATE USER
userRoutes.post('/users', createUser );

//UPDATE USER

userRoutes.patch('/users/:id', updateUser)
userRoutes.get('/users/:id/edit', UpdateForm )

// DELETE USER
userRoutes.delete('/users/:id', deleteUser);

module.exports = userRoutes;
