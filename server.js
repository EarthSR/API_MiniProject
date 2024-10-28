const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME = 5 * 60 * 1000; // 5 นาทีในหน่วยมิลลิวินาที

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'db_miniprojectfinal' 
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

db.connect();
const query = util.promisify(db.query).bind(db); 

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


/////////////////////////////////////// Mobile ///////////////////////////////////////

// -------- ROUTES --------

// Get all Thai Celebrities
app.get('/api/thaiCelebrities', (req, res) => {
    const sql = 'SELECT * FROM ThaiCelebrities';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new Thai Celebrity
app.post('/api/thaiCelebrities', (req, res) => {
    const { ThaiCelebrities_Imagefile } = req.body;
    const sql = 'INSERT INTO ThaiCelebrities (ThaiCelebrities_Imagefile) VALUES (?)';
    db.query(sql, [ThaiCelebrities_Imagefile], (err, result) => {
        if (err) throw err;
        res.send('Thai celebrity added!');
    });
});

// Get all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new user
app.post('/api/users', (req, res) => {
    const { username, password, Role_ID } = req.body;
    const sql = 'INSERT INTO Users (username, password, Role_ID) VALUES (?, ?, ?)';
    db.query(sql, [username, password, Role_ID], (err, result) => {
        if (err) throw err;
        res.send('User added!');
    });
});

// Get all roles
app.get('/api/roles', (req, res) => {
    const sql = 'SELECT * FROM Role';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new role
app.post('/api/roles', (req, res) => {
    const { Type_Name } = req.body;
    const sql = 'INSERT INTO Role (Type_Name) VALUES (?)';
    db.query(sql, [Type_Name], (err, result) => {
        if (err) throw err;
        res.send('Role added!');
    });
});

// Get all similarity records
app.get('/api/similarity', (req, res) => {
    const sql = 'SELECT * FROM similarity';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// เพิ่ม similarity record หลังจากแปลงชื่อเป็น ID แล้ว
app.post('/api/similarity', async (req, res) => {
    const { similarity_Date, similarityDetail_Percent, celebrityName } = req.body;

    if (!celebrityName) {
        return res.status(400).json({ error: 'Celebrity name is missing' });
    }

    try {
        // เรียกใช้ API เพื่อแปลงชื่อเป็น ThaiCelebrities_ID
        const sql = 'SELECT ThaiCelebrities_ID FROM thaicelebrities WHERE ThaiCelebrities_name = ?';
        const results = await query(sql, [celebrityName]);

        if (results.length > 0) {
            const ThaiCelebrities_ID = results[0].ThaiCelebrities_ID;

            // เมื่อได้ ThaiCelebrities_ID แล้ว จะบันทึกลง similarity table
            const insertSql = 'INSERT INTO similarity (similarity_Date, similarityDetail_Percent, ThaiCelebrities_ID) VALUES (?, ?, ?)';
            db.query(insertSql, [similarity_Date, similarityDetail_Percent, ThaiCelebrities_ID], (err, result) => {
                if (err) throw err;
                res.send('Similarity record added!');
            });
        } else {
            res.status(404).json({ error: 'Celebrity not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all age records
app.get('/api/age', (req, res) => {
    const sql = 'SELECT * FROM age';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add an age record
app.post('/api/age', (req, res) => {
    const { age_Imageuser, age_Date, age_Percent, age_result } = req.body;
    const sql = 'INSERT INTO age (age_Imageuser, age_Date, age_Percent, age_result) VALUES (?, ?, ?, ?)';
    db.query(sql, [age_Imageuser, age_Date, age_Percent, age_result], (err, result) => {
        if (err) throw err;
        res.send('Age record added!');
    });
});

// -------- START HTTP SERVER --------
const httpPort = 3000;  // ใช้พอร์ต 3000 สำหรับ HTTP ในการทดสอบในเครื่อง
const httpServer = http.createServer(app);

httpServer.listen(httpPort, () => {
    console.log(`HTTP Server running on port ${httpPort}`);
});
