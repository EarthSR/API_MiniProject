const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const cors = require('cors');
const fetch = require('node-fetch');
const SECRET_KEY = 'UX23Y24%@&2aMb';
const app = express();


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


/////////////////////////////////////// React ///////////////////////////////////////


// Login API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    let sql = '';
    let user = {};
    let Role_ID = null;

    try {
        // Query for user from the 'users' table
        sql = "SELECT * FROM users WHERE username=?";
        let users = await query(sql, [username]);

        if (users.length > 0) {
            user = users[0];
            Role_ID = user['Role_ID'];

            // ตรวจสอบว่าเฉพาะ Role_ID 1 หรือ 2 ที่สามารถเข้าสู่ระบบได้
            if (Role_ID !== 1 && Role_ID !== 2) {
                return res.send({ message: 'คุณไม่มีสิทธิ์ในการเข้าสู่ระบบ', status: false });
            }

            // ตรวจสอบรหัสผ่านโดยใช้ bcrypt
            const passwordMatch = await bcrypt.compare(password, user['password']);
            if (passwordMatch) {
                // สร้าง JWT token
                const token = jwt.sign({ id: user['id'], role: Role_ID }, SECRET_KEY, { expiresIn: '1h' });
                return res.send({
                    message: 'เข้าสู่ระบบสำเร็จ',
                    status: true,
                    token: token,
                    Role_ID: Role_ID
                });
            } else {
                return res.send({ message: 'รหัสผ่านไม่ถูกต้อง', status: false });
            }
        } else {
            return res.send({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'เกิดข้อผิดพลาดในระบบ', status: false });
    }
});

// Logout API
app.post('/api/logout', (req, res) => {
    res.send({ status: true, message: 'Logout successful' });
});

app.post('/api/predict', async (req, res) => {
    try {
        const formData = new FormData();
        formData.append('image', req.body.image);
            const response = await fetch(process.env.REACT_APP_PREDICT_BASE_URL + '/predict', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error connecting to Flask server', error: error.message });
    }
});


/////////////////////////////////////// Mobile ///////////////////////////////////////


// -------- ROUTES --------

// Get all Thai Celebrities
app.get('/thaiCelebrities', (req, res) => {
    const sql = 'SELECT * FROM ThaiCelebrities';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new Thai Celebrity
app.post('/thaiCelebrities', (req, res) => {
    const { ThaiCelebrities_Imagefile } = req.body;
    const sql = 'INSERT INTO ThaiCelebrities (ThaiCelebrities_Imagefile) VALUES (?)';
    db.query(sql, [ThaiCelebrities_Imagefile], (err, result) => {
        if (err) throw err;
        res.send('Thai celebrity added!');
    });
});

// Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new user
app.post('/users', (req, res) => {
    const { username, password, Role_ID } = req.body;
    const sql = 'INSERT INTO Users (username, password, Role_ID) VALUES (?, ?, ?)';
    db.query(sql, [username, password, Role_ID], (err, result) => {
        if (err) throw err;
        res.send('User added!');
    });
});

// Get all roles
app.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM Role';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new role
app.post('/roles', (req, res) => {
    const { Type_Name } = req.body;
    const sql = 'INSERT INTO Role (Type_Name) VALUES (?)';
    db.query(sql, [Type_Name], (err, result) => {
        if (err) throw err;
        res.send('Role added!');
    });
});

// Get all similarity records
app.get('/similarity', (req, res) => {
    const sql = 'SELECT * FROM similarity';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// เพิ่ม similarity record หลังจากแปลงชื่อเป็น ID แล้ว
app.post('/similarity', async (req, res) => {
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
app.get('/age', (req, res) => {
    const sql = 'SELECT * FROM age';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add an age record
app.post('/age', (req, res) => {
    const { age_Imageuser, age_Date, age_Percent, age_result } = req.body;
    const sql = 'INSERT INTO age (age_Imageuser, age_Date, age_Percent, age_result) VALUES (?, ?, ?, ?)';
    db.query(sql, [age_Imageuser, age_Date, age_Percent, age_result], (err, result) => {
        if (err) throw err;
        res.send('Age record added!');
    });
});


// -------- START SERVER --------
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
