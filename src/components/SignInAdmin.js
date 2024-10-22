import Avatar from '@mui/material/Avatar';
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

const defaultTheme = createTheme();

export default function SignInAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/login',
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
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8d7da', // สีพื้นหลังตามภาพ
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#ffffff',  // สีพื้นกล่องกรอกข้อมูล
              padding: 4,
              borderRadius: '16px',  // ปรับขอบให้มนขึ้น
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // เงาของกล่อง
            }}
          >
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
              MiniProjectFinal
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
                  backgroundColor: '#fff8f0',  // สีพื้นหลังกล่องข้อความ
                  mb: 2,
                  boxShadow: 'none',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#000000', // ขอบกล่องข้อความเป็นสีดำ
                      borderRadius: '8px',
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
                  backgroundColor: '#fff8f0',  // สีพื้นหลังกล่องข้อความ
                  mb: 2,
                  boxShadow: 'none',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#000000',  // ขอบกล่องข้อความเป็นสีดำ
                      borderRadius: '8px',
                    },
                  },
                }}
                InputLabelProps={{
                  style: { color: '#333' },  // สีตัวอักษรของ Label
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#fcebb6',  // สีปุ่มเป็นสีเหลืองอ่อน
                  color: 'black',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  width: '100%',
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)', // เงาปุ่ม
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
