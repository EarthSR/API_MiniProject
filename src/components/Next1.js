import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import webbg from './image/webbg.png'; // นำเข้าภาพพื้นหลัง
import { motion } from 'framer-motion'; // นำเข้า framer-motion

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
  const navigate = useNavigate();
  const location = useLocation();
  const { imageFile } = location.state || {};

  const handleFacePrediction = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://192.168.1.49:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/nextface', { state: { result: data } });
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}  // เพิ่ม animation คล้ายหน้าอื่นๆ
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            backgroundImage: `url(${webbg})`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '0 16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '900px',
              marginBottom: 4,
              flexDirection: { xs: 'column', md: 'row' }, // แสดงเป็นแนวตั้งในมือถือ
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: '30px',
                padding: '20px', // ลดขนาด padding ให้เหมาะกับจอมือถือ
                width: { xs: '100%', md: '400px' }, // ปรับขนาดปุ่มให้เต็มจอในมือถือ
                height: '70px', // ลดความสูงปุ่มสำหรับมือถือ
                fontSize: '16px', // ลดขนาดตัวอักษรให้เหมาะสม
                fontWeight: 'bold',
                backgroundColor: '#FEFFDA',
                color: 'black',
                border: '2px solid #000',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#ffeb3b',
                  transform: 'scale(1.05)',
                },
                marginBottom: { xs: '20px', md: '0' }, // เพิ่ม margin สำหรับมือถือ
              }}
              onClick={handleFacePrediction}
            >
              หน้าของคุณเหมือนดาราคนไหน
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: '30px',
                padding: '20px',
                width: { xs: '100%', md: '400px' }, // ปรับขนาดปุ่มให้เต็มจอในมือถือ
                height: '70px', // ลดความสูงปุ่มสำหรับมือถือ
                fontSize: '16px', // ลดขนาดตัวอักษร
                fontWeight: 'bold',
                backgroundColor: '#FEFFDA',
                color: 'black',
                border: '2px solid #000',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#ffeb3b',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => navigate('/nextage')}
            >
              คุณอายุเท่าไหร่
            </Button>
          </Box>

          <Button
            variant="contained"
            sx={{
              borderRadius: '30px',
              padding: '20px',
              width: { xs: '100%', md: '400px' }, // ปรับขนาดปุ่มให้เต็มจอในมือถือ
              height: '70px', // ลดความสูงปุ่มสำหรับมือถือ
              fontSize: '16px', // ลดขนาดตัวอักษร
              fontWeight: 'bold',
              backgroundColor: '#FEFFDA',
              color: 'black',
              border: '2px solid #000',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              bottom: { xs: '0', md: '-150px' }, // ปรับตำแหน่งให้เหมาะกับจอมือถือ
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#ffeb3b',
                transform: 'scale(1.05)',
              },
              marginTop: { xs: '20px', md: '0' }, // เพิ่ม margin ในมือถือ
            }}
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </Button>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}
