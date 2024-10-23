import React, { useState } from 'react';
import { Container, Box, Card, CardContent, Button, IconButton, Typography } from '@mui/material';
import { PhotoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // นำเข้า framer-motion เพื่อเพิ่ม animation
import webbg from './image/webbg.png';
import starImage from './image/star.png'; // นำเข้าภาพ star

export default function Mainpage() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // state สำหรับแสดงข้อความเตือน
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setErrorMessage(''); // เคลียร์ข้อความเตือนเมื่อผู้ใช้เลือกไฟล์

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = () => {
    if (!imageFile) {
      setErrorMessage('กรุณาอัปโหลดรูปภาพก่อนทำการทำนาย!'); // แสดงข้อความเตือน
    } else {
      navigate('/next1', { state: { imageFile: imageFile } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}  // ค่อยๆ เพิ่ม opacity และขยายขนาดจาก 95% เป็น 100%
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}  // ค่อยๆ หายไปด้วยการลดขนาดและลด opacity
      transition={{ duration: 0.8, ease: 'easeInOut' }}  // ทำให้การเปลี่ยนแปลงลื่นไหล
      style={{ minHeight: '100vh', overflow: 'hidden' }} // ล็อกการเลื่อนขึ้นลง
    >
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${webbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          position: 'fixed',  // ล็อกเนื้อหาให้อยู่ในตำแหน่งนี้
          width: '100%',  // ใช้พื้นที่เต็มหน้าจอ
          height: '100vh',  // ความสูงเต็มหน้าจอ
        }}
      >
        <Container maxWidth="lg">
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{ flexDirection: { xs: 'column', md: 'row' }}}  // ปรับแนวการวางให้เรียงในแนวตั้งสำหรับโทรศัพท์
          >
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              sx={{ width: { xs: '100%', md: 'auto' }}}  // ปรับขนาดของกล่องให้เต็มจอในมือถือ
            >
              {/* ข้อความ Select Image ที่ใหญ่และโดดเด่นขึ้น */}
              <Typography
                variant="h3" // เพิ่มขนาดใหญ่ขึ้น
                sx={{
                  fontWeight: 'bold',
                  color: '#fff', // สีขาวเพื่อความชัดเจน
                  marginBottom: 3,
                  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', // เพิ่มเงาให้ข้อความโดดเด่น
                  fontSize: { xs: '1.5rem', md: '3rem' }  // ปรับขนาดฟอนต์ตามขนาดหน้าจอ
                }}
              >
                Select Image
              </Typography>

              <Card
                sx={{
                  width: { xs: '300px', md: '400px' }, // ปรับขนาดกล่องภาพตามขนาดหน้าจอ
                  height: { xs: '300px', md: '400px' }, // ปรับขนาดกล่องภาพตามขนาดหน้าจอ
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fafafa', // พื้นหลังสว่างขึ้น
                  borderRadius: '20px', // ขอบมนเพิ่มขึ้น
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // เพิ่มเงาให้ดูโดดเด่น
                  marginBottom: 3,
                  border: '2px solid #000', // กรอบสีดำหนาขึ้น
                }}
              >
                <CardContent>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '20px', // ขอบมนของภาพ
                        }}
                      />
                    ) : (
                      <PhotoLibrary sx={{ fontSize: { xs: 50, md: 70 }, color: '#1976d2' }} /> // ไอคอนใหญ่ขึ้นและสีที่ชัดเจน
                    )}
                  </IconButton>
                </CardContent>
              </Card>

              {/* ข้อความเตือน */}
              {errorMessage && (
                <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
                  {errorMessage}
                </Typography>
              )}

              {/* ปุ่มทำนาย ที่ใหญ่และดูน่ากดมากขึ้น */}
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePredict}
                sx={{
                  borderRadius: '20px',
                  padding: { xs: '10px 20px', md: '15px 30px' },  // ปรับขนาดปุ่มตามหน้าจอ
                  backgroundColor: '#FEFFDA', // Yellow background color for button
                  color: '#000', // Black text color
                  border: '2px solid #000', // Black border หนาขึ้น
                  fontWeight: 'bold',
                  fontSize: { xs: '16px', md: '18px' }, // เพิ่มขนาดตัวอักษรให้ใหญ่ขึ้นตามขนาดหน้าจอ
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#ffcc80', // สีเมื่อ hover เปลี่ยนเป็นส้มอ่อน
                    transform: 'scale(1.05)', // เพิ่มเอฟเฟกต์ขยายเล็กน้อยเมื่อ hover
                  },
                }}
              >
                ทำนาย
              </Button>
            </Box>

            {/* แสดงกรอบรูป star ขวามือ */}
            <Box
              sx={{
                width: { xs: '200px', md: 'auto' },  // ปรับขนาดของภาพให้เหมาะสมในมือถือ
                height: { xs: '200px', md: 'auto' }, // ปรับขนาดของภาพให้เหมาะสมในมือถือ
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                maxWidth: '600px',
                maxHeight: '600px',
              }}
            >
              <img src={starImage} alt="Star" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> {/* กรอบรูป star */}
            </Box>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
}
