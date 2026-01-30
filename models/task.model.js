const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.getAllTasks = (callback) => {
    db.query(
        `SELECT id, title, description, status, created_at AS createdAt
         FROM tasks
         ORDER BY created_at DESC`,
        callback
    );
};

exports.getTaskById = (id, callback) => {
    db.query(
        `SELECT id, title, description, status, created_at AS createdAt
         FROM tasks
         WHERE id = ?`,
        [id],
        callback
    );
};

exports.createTask = (data, callback) => {
    const { title, description, status } = data;

    db.query(
        `INSERT INTO tasks (id, title, description, status)
         VALUES (?, ?, ?, ?)`,
        [uuidv4(), title, description, status],
        callback
    );
};

exports.updateTask = (id, data, callback) => {
    const { title, description, status } = data;

    db.query(
        `UPDATE tasks
         SET title=?, description=?, status=?
         WHERE id=?`,
        [title, description, status, id],
        callback
    );
};

exports.deleteTask = (id, callback) => {
    db.query(
        `DELETE FROM tasks WHERE id=?`,
        [id],
        callback
    );
};
