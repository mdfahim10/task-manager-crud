const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "siralexfahim",
    database: "task_manager",

    timezone: "+05:30",
    waitForConnections: true,
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ DB connection failed:", err.message);
        return;
    }
    console.log("✅ MySQL connected");
    connection.release();
});

module.exports = pool;
