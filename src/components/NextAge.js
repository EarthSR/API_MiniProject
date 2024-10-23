import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทาง
import { Box, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'; // นำเข้า framer-motion
import webbg from './image/webbg.png';  // นำเข้าภาพพื้นหลัง
import { useImage } from '../ImageContext'; // นำเข้า useImage จาก ImageContext

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
  const { imageFile } = useImage(); // ดึงข้อมูล imageFile จาก context

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}  // Animation เริ่มต้น: ขนาดเล็กและทึบแสง
        animate={{ opacity: 1, scale: 1 }}     // Animation ที่จะเกิดขึ้น: ขนาดเต็มและโปร่งใส
        exit={{ opacity: 0, scale: 0.95 }}     // Animation เมื่อออกจากหน้า: ลดขนาดและลดความโปร่งใส
        transition={{ duration: 0.8, ease: 'easeInOut' }}  // กำหนดระยะเวลา 0.8 วินาที
        style={{ height: '100vh' }}  // เพิ่ม style สำหรับ container
      >
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}  // เพิ่ม animation เมื่อโหลดรูปภาพ
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }} // ปรับให้ animation ทำงานช้าลง
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
              {/* รูปภาพที่ผู้ใช้อัปโหลด */} 
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
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)} // ใช้รูปจาก imageFile
                    alt="Uploaded person"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
                    No Image Uploaded
                  </Typography>
                )}
              </Box>
            </Box>
          </motion.div>

          {/* ส่วนที่แสดงอายุ */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            อายุ: <span style={{ backgroundColor: '#ffefc0', padding: '0 16px', borderRadius: '8px' }}>N/A</span>
          </Typography>

          {/* ปุ่มย้อนกลับ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}  // Animation เริ่มต้น: เลื่อนลง
            animate={{ opacity: 1, y: 0 }}   // Animation ที่จะเกิดขึ้น: กลับไปที่ตำแหน่งปกติ
            transition={{ duration: 0.8, ease: 'easeInOut' }} // ปรับความเร็ว 0.8 วินาที
          >
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                id="back-button"
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
                onClick={() => navigate('/next1')} // ใช้ navigate('/next1') เพื่อไปยังหน้า next1
              >
                ย้อนกลับ
              </Button>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}
