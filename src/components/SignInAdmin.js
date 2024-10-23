import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // นำเข้า framer-motion

const defaultTheme = createTheme();

export default function SigninAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/login',
        {
          username,
          password
        }
      );

      const result = response.data;
      alert(result['message']);

      if (result['status'] === true) {
        localStorage.setItem('token', result['token']);
        if (result['Role_ID'] === 1 || result['Role_ID'] === 2) {
          navigate('/dashboard');  // นำทางไปหน้า dashboard ถ้าเป็น admin หรือ employee
        } else {
          alert('คุณไม่มีสิทธิ์ในการเข้าถึงระบบ');
        }
      }
    } catch (err) {
      console.log(err);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}  // Animation ตอนโหลดหน้าเข้ามา
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        style={{ minHeight: '100vh' }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: '#faf5f5', // สีพื้นหลังอ่อนๆ
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                mt: 10,  // เพิ่ม margin-top 100px
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                padding: 4,
                borderRadius: '16px',
                boxShadow: 'none', // ลบเงาของกล่องและพื้นหลังสีขาว
              }}
            >
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
                Who Are You ?
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    backgroundColor: '#ffffff',  // สีพื้นหลังกล่องข้อความ
                    mb: 2,
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#000000', // ขอบกล่องข้อความเป็นสีดำ
                      },
                      '&:hover fieldset': {
                        borderColor: '#FF69B4',  // สีขอบเมื่อ hover เป็นสีชมพู
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: '#333' },  // สีตัวอักษรของ Label
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    backgroundColor: '#ffffff',  // สีพื้นหลังกล่องข้อความ
                    mb: 2,
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#000000',  // ขอบกล่องข้อความเป็นสีดำ
                      },
                      '&:hover fieldset': {
                        borderColor: '#FF69B4',  // สีขอบเมื่อ hover เป็นสีชมพู
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: '#333' },  // สีตัวอักษรของ Label
                  }}
                />
                <Button
                  type="submit"
                  id="Submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#FFE5EC',  // พื้นหลังปุ่มเป็นสีชมพูอ่อน
                    color: '#FB6F92',  // ตัวอักษรสีชมพูเข้ม
                    border: '2px solid #F694C1',  // ขอบปุ่มสีชมพูอ่อน
                    padding: '12px',
                    borderRadius: '8px', // ขอบมนของปุ่ม
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: 'none', // ไม่มีเงาปุ่ม
                    '&:hover': {
                      backgroundColor: '#ffccd5', // สีพื้นหลังเมื่อ hover
                    },
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}
