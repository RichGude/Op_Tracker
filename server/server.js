/*
This file contains all of the express app, middleware, and route commands for the Application

This file is designed to work with a PostGRES database named 'pern' operating with a table, 
'operations'.
*/

// Load libraries
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const types = require("pg").types;

// Initialize an instance of express
const app = express();

// Need outputs from node-postgres to be in just Date format (pg otherwise adds UTC)
types.setTypeParser(1082, function(stringValue) {
    return stringValue;  //1082 for date type
  });

// Middleware for allowing CORS access between server and client
app.use(cors())
// Middleware for logging server requests to the console
app.use(morgan("dev"));
// Middleware for attaching post 'body' information to the request (so the app can retrieve and use)
app.use(express.json());

//### Define HTTP requests to the app (the request and response variables are automatically stored) ###//
// Get all operations
app.get("/api/v1/operations", async (req, res) => {
    // Any function with a promise (like 'query') can utilize the async/await keywords
    try {
        const str_query = "SELECT * FROM operations;";
        // Get all operations data
        const results = await db.query(str_query);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: results.rows
        });
    } catch (e) {
        console.log(e);
    }
});

// Get one operation
app.get("/api/v1/operations/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // Utilize parameterized queries to protect against injection vulnerabilities
        const results = await db.query("SELECT * FROM operations WHERE operations.id = $1;", [id]);
        
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: results.rows[0],
        });
    } catch (e) {
        console.log(e);
    }
});

// Create one operation
app.post("/api/v1/operations", async (req, res) => {
    try {
        const str_query = "INSERT INTO operations (requirement, team, team_id, obj_opn, capability, progress, status, document, category, completed, bullet1, bullet2, bullet3, bullet4, bullet5, poc) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *;";
        // Utilize parameterized queries to protect against injection vulnerabilities
        const results = await db.query(str_query, [req.body.requirement, req.body.team, req.body.team_id, req.body.obj_opn, req.body.capability, req.body.progress, req.body.status, 
            req.body.document, req.body.category, req.body.completed, req.body.bullet1, req.body.bullet2, req.body.bullet3, req.body.bullet4, req.body.bullet5, req.body.poc, req.body.updated]);
        
        res.status(201).json({
            status: "success",
            results: results.rows.length,
            data: results.rows[0]
        });
    } catch (e) {
        console.log(e);
    }
});

// Update one operation
app.put("/api/v1/operations/:id", async (req, res) => {
    try {
        const str_query = "UPDATE operations SET requirement = $1, team = $2, team_id = $3, obj_opn = $4, capability = $5, progress = $6, status = $7, document = $8, category = $9, \
            completed = $10, bullet1 = $11, bullet2 = $12, bullet3 = $13, bullet4 = $14, bullet5 = $15, poc = $16, updated = $17 WHERE id = $18 RETURNING *;";
        // Utilize parameterized queries to protect against injection vulnerabilities
        const results = await db.query(str_query, [req.body.requirement, req.body.team, req.body.team_id, req.body.obj_opn, req.body.capability, req.body.progress, req.body.status, 
            req.body.document, req.body.category, req.body.completed, req.body.bullet1, req.body.bullet2, req.body.bullet3, req.body.bullet4, req.body.bullet5, req.body.poc, req.body.updated, req.params.id]);
        
            res.status(201).json({
            status: "success",
            results: results.rows.length,
            data: results.rows[0]
        });
    } catch (e) {
        console.log(e);
    }
});

// delete one operation
app.delete("/api/v1/operations/:id", async (req, res) => {
    const results = await db.query("DELETE FROM operations WHERE id = $1", [req.params.id])
    res.status(204).json({
        status: "success"
    });
});



// ### Operations Tracker Database Queries (for the metrics of operations)
// Get all Tracker information
app.get("/api/v1/tracker", async (req, res) => {
    try {
        const str_query = "SELECT * FROM tracker;";
        // Get all tracker data
        const results = await db.query(str_query);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: results.rows
        });
    } catch (e) {
        console.log(e);
    }
});

// Get one tracker commodity
app.get("/api/v1/tracker/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // Utilize parameterized queries to protect against injection vulnerabilities
        const results = await db.query("SELECT * FROM tracker WHERE tracker.id = $1;", [id]);
        
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: results.rows[0],
        });
    } catch (e) {
        console.log(e);
    }
});

// Create one tracker commodity
app.post("/api/v1/tracker", async (req, res) => {
    try {
        const str_query = 'INSERT INTO tracker ("AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ", "KKK", "LLL", "MMM", "NNN", "OOO", "PPP", "QQQ", "RRR", "SSS", "TTT", "UUU") \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *;';
        // Utilize parameterized queries to protect against injection vulnerabilities
        const results = await db.query(str_query, [req.body.AAA, req.body.BBB, req.body.CCC, req.body.DDD, req.body.EEE, req.body.FFF, req.body.GGG, req.body.HHH, req.body.III,
            req.body.JJJ, req.body.KKK, req.body.LLL, req.body.MMM, req.body.NNN, req.body.OOO, req.body.PPP, req.body.QQQ, req.body.RRR, req.body.SSS, req.body.TTT, req.body.UUU,]);
        
        res.status(201).json({
            status: "success",
            results: results.rows.length,
            data: results.rows[0]
        });
    } catch (e) {
        console.log(e);
    }
});

// Update one tracker commodity
app.put("/api/v1/tracker/:id", async (req, res) => {
    try {
        const str_query = 'UPDATE tracker SET "AAA" = $1, "BBB" = $2, "CCC" = $3, "DDD" = $4, "EEE" = $5, "FFF" = $6, "GGG" = $7, "HHH" = $8, "III" = $9, "JJJ" = $10, "KKK" = $11, "LLL" = $12, "MMM" = $13, \
            "NNN" = $14, "OOO" = $15, "PPP" = $16, "QQQ" = $17, "RRR" = $18, "SSS" = $19, "TTT" = $20, "UUU" = $21 WHERE id = $22 RETURNING *;';
        // Utilize parameterized queries to protect against injection vulnerabilities
        const results = await db.query(str_query, [req.body.AAA, req.body.BBB, req.body.CCC, req.body.DDD, req.body.EEE, req.body.FFF, req.body.GGG, req.body.HHH, req.body.III,
            req.body.JJJ, req.body.KKK, req.body.LLL, req.body.MMM, req.body.NNN, req.body.OOO, req.body.PPP, req.body.QQQ, req.body.RRR, req.body.SSS, req.body.TTT, req.body.UUU, req.params.id]);
        
            res.status(201).json({
            status: "success",
            results: results.rows.length,
            data: results.rows[0]
        });
    } catch (e) {
        console.log(e);
    }
});

// delete one operation
app.delete("/api/v1/tracker/:id", async (req, res) => {
    const results = await db.query("DELETE FROM tracker WHERE id = $1", [req.params.id])
    res.status(204).json({
        status: "success"
    });
});

// Load app port value from local .env file
const port = process.env.PORT || 3001;

// Specify a port on which the app will listen for requests and a callback functions that runs when the
//   app initializes successfully running
app.listen(port, () => {
    console.log(`Express Server is runnning on Port ${port}`);
})