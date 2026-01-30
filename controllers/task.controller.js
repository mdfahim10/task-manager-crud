const Task = require("../models/task.model");

// HOME
exports.home = (req, res) => {
    res.redirect("/tasks");
};

// INDEX
exports.index = (req, res) => {
    Task.getAllTasks((err, tasks) => {
        if (err) throw err;
        res.render("index", { tasks });
    });
};

// NEW
exports.newForm = (req, res) => {
    res.render("new");
};

// CREATE
exports.create = (req, res) => {
    Task.createTask(req.body, err => {
        if (err) throw err;
        res.redirect("/tasks");
    });
};

// SHOW
exports.show = (req, res) => {
    Task.getTaskById(req.params.id, (err, result) => {
        if (err) throw err;
        res.render("show", { task: result[0] });
    });
};

// EDIT
exports.editForm = (req, res) => {
    Task.getTaskById(req.params.id, (err, result) => {
        if (err) throw err;
        res.render("edit", { task: result[0] });
    });
};

// UPDATE
exports.update = (req, res) => {
    Task.updateTask(req.params.id, req.body, err => {
        if (err) throw err;
        res.redirect("/tasks");
    });
};

// DELETE
exports.delete = (req, res) => {
    Task.deleteTask(req.params.id, err => {
        if (err) throw err;
        res.redirect("/tasks");
    });
};
