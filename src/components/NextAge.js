import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทาง
import { Box, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import webbg from './image/webbg.png';  // นำเข้าภาพพื้นหลัง

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

export default function ImageComparisonPage() {
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อจัดการการนำทาง

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${webbg})`,  // ตั้งค่า background image
          backgroundSize: 'cover',           // ปรับภาพให้ครอบคลุมเต็มพื้นที่
          backgroundPosition: 'center',      // จัดกึ่งกลางภาพ
          height: '100vh',                   // ความสูงเต็มหน้าจอ
          display: 'flex',                   // จัดให้เนื้อหาอยู่กลางจอ
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',           // จัดให้เนื้อหาอยู่ในแนวตั้ง
          padding: '0 16px',                 // เพิ่ม padding ด้านข้าง
        }}
      >
        {/* กล่องสำหรับจัดวางรูปภาพ */} 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          {/* รูปภาพคนเดียว */}
          <Box
            sx={{
              marginTop: '100px',
              width: '400px',
              height: '400px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <img
              src="/path/to/your/image1.png" // ใช้รูปตามที่กำหนด
              alt="person"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        {/* ส่วนที่แสดงอายุ */} 
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          อายุ: <span style={{ backgroundColor: '#ffefc0', padding: '0 16px', borderRadius: '8px' }}></span>
        </Typography>

        {/* ปุ่มย้อนกลับ */} 
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: '10px', 
              border: '1px solid #000', // เพิ่มกรอบสีดำ
              padding: '10px', // ปรับ padding
              width: '100%', // ปรับความกว้างให้เต็ม
              maxWidth: '200px', // กำหนดขนาดสูงสุด
              height: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: '#FEFFDA',  // สีพื้นหลังปุ่ม
              color: 'black',              // สีข้อความปุ่ม
              '&:hover': {
                backgroundColor: '#ffd996', // สีเมื่อ hover
              },
            }}
            onClick={() => navigate(-1)} // ใช้ navigate(-1) เพื่อย้อนกลับไปยังหน้าก่อนหน้า
          >
            ย้อนกลับ
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
