import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทาง
import { Box, Button } from '@mui/material';
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

export default function CustomPage() {
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
          flexDirection: 'column',
          padding: '0 16px',                 // เพิ่ม padding ด้านข้าง
        }}
      >
        {/* กล่องสำหรับปุ่มสองปุ่มด้านบน */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
          {/* ปุ่มหน้าของคุณเหมือนดาราคนไหน */}
          <Button
            variant="contained"
            sx={{
              borderRadius: '10px',
              border: '1px solid #000', // เพิ่มกรอบสีดำ
              padding: '10px',
              width: { xs: '100%', sm: '350px' }, // ปรับความกว้างตามขนาดหน้าจอ
              height: '70px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#FEFFDA',  // สีพื้นหลังปุ่ม
              color: 'black',              // สีข้อความปุ่ม
              textAlign: 'center',         // จัดข้อความให้อยู่ตรงกลาง
              boxShadow: 3,                // เงาของปุ่ม
            }}
            onClick={() => navigate('/nextface')}  // นำทางไปหน้า NextFace
          >
            หน้าของคุณเหมือนดาราคนไหน
          </Button>

          {/* ปุ่มคุณอายุเท่าไหร่ */}
          <Button
            variant="contained"
            sx={{
              borderRadius: '10px',
              border: '1px solid #000', // เพิ่มกรอบสีดำ
              padding: '10px',
              width: { xs: '100%', sm: '350px' }, // ปรับความกว้างตามขนาดหน้าจอ
              height: '70px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#FEFFDA',  // สีพื้นหลังปุ่ม
              color: 'black',              // สีข้อความปุ่ม
              textAlign: 'center',         // จัดข้อความให้อยู่ตรงกลาง
              boxShadow: 3,                // เงาของปุ่ม
            }}
            onClick={() => navigate('/nextage')}  // นำทางไปหน้า NextAge
          >
            คุณอายุเท่าไหร่
          </Button>
        </Box>

        {/* ปุ่มย้อนกลับ */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: '10px',
              border: '1px solid #000', // เพิ่มกรอบสีดำ
              padding: '10px',
              width: { xs: '100%', sm: '300px' }, // ปรับความกว้างตามขนาดหน้าจอ
              height: '70px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#FEFFDA',  // สีพื้นหลังปุ่ม
              color: 'black',              // สีข้อความปุ่ม
              textAlign: 'center',         // จัดข้อความให้อยู่ตรงกลาง
              boxShadow: 3,                // เงาของปุ่ม
            }}
            onClick={() => navigate(-1)}  // นำทางย้อนกลับไปยังหน้าเดิม
          >
            ย้อนกลับ
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
