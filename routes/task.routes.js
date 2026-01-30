const express = require("express");
const router = express.Router();   // ✅ THIS WAS MISSING
const controller = require("../controllers/task.controller");

// Home redirect
router.get("/", controller.home);

// Tasks
router.get("/tasks", controller.index);
router.get("/tasks/new", controller.newForm);
router.post("/tasks", controller.create);
router.get("/tasks/:id", controller.show);
router.get("/tasks/:id/edit", controller.editForm);
router.put("/tasks/:id", controller.update);
router.delete("/tasks/:id", controller.delete);

module.exports = router;
