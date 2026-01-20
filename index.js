const express = require("express");
const app = express();
const port = process.env.PORT || 8080; 
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// middleware
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride(function (req, res) {
    if (req.body && req.body._method) {
        return req.body._method;
    }
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// TEMP DATABASE
let tasks = [];

// HOME
app.get("/", (req, res) => {
    res.redirect("/tasks");
});

// INDEX ROUTE
app.get("/tasks", (req, res) => {
    res.render("index.ejs", { tasks });
});

// NEW ROUTE
app.get("/tasks/new", (req, res) => {
    res.render("new.ejs");
});

// CREATE ROUTE
app.post("/tasks", (req, res) => {
    let { title, description, status } = req.body;

    let newTask = {
        id: uuidv4(),
        title,
        description,
        status,
        createdAt: new Date()
    };

    tasks.push(newTask);
    res.redirect("/tasks");
});

// SHOW ROUTE
app.get("/tasks/:id", (req, res) => {
    let task = tasks.find(t => t.id === req.params.id);
    res.render("show.ejs", { task });
});

// EDIT ROUTE
app.get("/tasks/:id/edit", (req, res) => {
    let task = tasks.find(t => t.id === req.params.id);
    res.render("edit.ejs", { task });
});

// UPDATE ROUTE
app.put("/tasks/:id", (req, res) => {
    let task = tasks.find(t => t.id === req.params.id);

    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;

    res.redirect("/tasks");
});

// DELETE ROUTE
app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id !== req.params.id);
    res.redirect("/tasks");
});

// SERVER
app.listen(port, () => {
    console.log("Server running at http://localhost:8080/tasks");
});
