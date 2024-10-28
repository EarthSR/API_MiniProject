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

/////////////////////////////////////// React ///////////////////////////////////////

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // ตรวจสอบผู้ใช้ในฐานข้อมูล
    const query = `SELECT * FROM users WHERE username = ?`;
    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) {
            return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
        }

        const user = results[0];

        // ตรวจสอบว่าบัญชีถูกล็อกหรือไม่
        const now = new Date();
        if (user.lock_until && new Date(user.lock_until) > now) {
            return res.status(403).json({ message: "บัญชีถูกล็อก กรุณาลองใหม่อีกครั้งในภายหลัง" });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // เพิ่มจำนวนการลองล็อกอินผิดพลาด
            let failed_attempts = user.failed_attempts + 1;
            let lock_until = null;

            if (failed_attempts >= MAX_FAILED_ATTEMPTS) {
                // ล็อกบัญชีเป็นเวลา 5 นาที
                lock_until = new Date(now.getTime() + LOCK_TIME);
            }

            // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
            const updateQuery = `UPDATE users SET failed_attempts = ?, lock_until = ? WHERE username = ?`;
            db.query(updateQuery, [failed_attempts, lock_until, username], (err) => {
                if (err) return res.status(500).send(err);
                if (lock_until) {
                    return res.status(403).json({ message: "บัญชีถูกล็อกเป็นเวลา 5 นาที" });
                }
                return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
            });
        } else {
            // ล็อกอินสำเร็จ รีเซ็ตจำนวนการลองผิดพลาด
            const updateQuery = `UPDATE users SET failed_attempts = 0, lock_until = NULL WHERE username = ?`;
            db.query(updateQuery, [username], (err) => {
                if (err) return res.status(500).send(err);

                // สร้าง JWT token
                const token = jwt.sign({ id: user.Users_ID, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                return res.json({ message: 'ล็อกอินสำเร็จ', token });
            });
        }
    });
});

// Logout API
app.post('/api/logout', (req, res) => {
    res.send({ status: true, message: 'Logout successful' });
});

// Dashboard
app.get('/api/get-count-age',async (req, res) => {
    const sql = "SELECT COUNT(*) AS Count FROM age";
    db.query(sql, (err, results) => {
      if (err) throw err;
        const CardData = results[0];
        CardData['message'] = "ทำรายการสำเร็จ"
        CardData['status'] = true
        res.send(CardData);
    });
  });
 
app.get('/api/get-count-similarity',async (req, res) => {
    const sql = "SELECT COUNT(*) AS Count FROM similarity";
    db.query(sql, (err, results) => {
      if (err) throw err;
        const CardData = results[0];
        CardData['message'] = "ทำรายการสำเร็จ"
        CardData['status'] = true
        res.send(CardData);
    });
  });
 
app.get('/api/get-star-top', async (req, res) => {
    const sql = `
        SELECT t.ThaiCelebrities_name, COUNT(s.ThaiCelebrities_ID) AS CelebrityCount
        FROM thaicelebrities t
        LEFT JOIN similarity s ON t.ThaiCelebrities_ID = s.ThaiCelebrities_ID
        GROUP BY t.ThaiCelebrities_name
        ORDER BY CelebrityCount DESC
        LIMIT 5;
    `;
 
    try {
        const rows = await query(sql);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'เกิดข้อผิดพลาดในระบบ', 'status': false});
    }
});

// API สำหรับนับจำนวนตามเดือนจากตาราง age
app.get('/api/age-count', (req, res) => {
    const query = `
        SELECT MONTH(age_Date) AS month, COUNT(*) AS count_per_month
        FROM age
        GROUP BY MONTH(age_Date)
        ORDER BY MONTH(age_Date);
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// API สำหรับนับจำนวนตามเดือนจากตาราง similarity
app.get('/api/similarity-count', (req, res) => {
    const query = `
        SELECT MONTH(similarity_Date) AS month, COUNT(*) AS count_per_month
        FROM similarity
        GROUP BY MONTH(similarity_Date)
        ORDER BY MONTH(similarity_Date);
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// -------- START HTTP SERVER --------
const httpPort = 4000;  // ใช้พอร์ต 4000 สำหรับ HTTP ในการทดสอบในเครื่อง
const httpServer = http.createServer(app);

httpServer.listen(httpPort, () => {
    console.log(`HTTP Server running on port ${httpPort}`);
});
