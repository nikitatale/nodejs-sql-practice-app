const faker  = require("@faker-js/faker");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodoverride = require("method-override");
const userRoutes = require("./routes/userRoutes.js")

app.use(methodoverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public" )));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
