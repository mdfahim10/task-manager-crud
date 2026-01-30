const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const taskRoutes = require("./routes/task.routes");

const app = express();
const port = 8080;

// BODY PARSER
app.use(express.urlencoded({ extended: true }));

// 🔥 FIX: FORCE method override from BODY
app.use(
    methodOverride((req, res) => {
        if (req.body && req.body._method) {
            return req.body._method;
        }
    })
);

// STATIC
app.use(express.static(path.join(__dirname, "public")));

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ROUTES
app.use("/", taskRoutes);

// SERVER
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/tasks`);
});
